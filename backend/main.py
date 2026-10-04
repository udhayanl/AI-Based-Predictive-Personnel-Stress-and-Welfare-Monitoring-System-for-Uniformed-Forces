import os
import sys
import logging
from typing import Dict, Any, Optional, List
from datetime import datetime
import json
from pathlib import Path

import joblib
import pandas as pd
import httpx
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("personnel_stress_api")

# Base directory and file paths
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "personnel_stress_model.pkl"
ASSESSMENTS_FILE = BASE_DIR / "assessments_store.json"

# Supabase Environment Variables (Optional for local, required for Supabase DB)
SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "") or os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
MODEL_DOWNLOAD_URL = os.getenv("MODEL_DOWNLOAD_URL", "")

def download_model_if_needed():
    """If model is missing on Render/Cloud, optionally download it from a remote URL."""
    if not MODEL_PATH.exists() and MODEL_DOWNLOAD_URL:
        logger.info(f"Model file missing. Downloading from {MODEL_DOWNLOAD_URL}...")
        try:
            with httpx.stream("GET", MODEL_DOWNLOAD_URL, timeout=120.0, follow_redirects=True) as response:
                response.raise_for_status()
                with open(MODEL_PATH, "wb") as f:
                    for chunk in response.iter_bytes(chunk_size=8192):
                        f.write(chunk)
            logger.info("Model download complete!")
        except Exception as e:
            logger.error(f"Failed to download model: {e}")

download_model_if_needed()

# Global model container
model_pipeline = None

def load_ml_model():
    """Loads the trained ML model pipeline using joblib."""
    global model_pipeline
    if not MODEL_PATH.exists():
        logger.error(f"Model file not found at {MODEL_PATH}")
        return None
    try:
        loaded = joblib.load(MODEL_PATH)
        logger.info(f"Model successfully loaded from {MODEL_PATH}")
        return loaded
    except Exception as e:
        logger.error(f"Error loading model from {MODEL_PATH}: {e}")
        return None

# Load model at startup
model_pipeline = load_ml_model()

# FastAPI application initialization
app = FastAPI(
    title="MWI · Mission Wellbeing API",
    description="""
### AI-Based Predictive Personnel Stress & Welfare Monitoring System
Production API hosting the machine learning pipeline for personnel welfare screening.

* **Decision Support Only**: Academic AI screening tool, not a medical/clinical diagnostic system.
* **Non-Punitive Mandate**: Predictions must never be used as the sole basis for disciplinary, deployment, or promotion actions.
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for local development and Vercel production deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# Input & Output Schemas
# -----------------------------------------------------------------------------
ALLOWED_GENDER = ["Male", "Female"]
ALLOWED_OCCUPATION = ["Business", "Corporate", "Housewife", "Others", "Student"]
ALLOWED_YES_NO = ["No", "Yes"]
ALLOWED_DAYS_INDOORS = [
    "1-14 days",
    "15-30 days",
    "31-60 days",
    "Go out Every day",
    "More than 2 months"
]
ALLOWED_TRI_STATE = ["Maybe", "No", "Yes"]
ALLOWED_MOOD_SWINGS = ["High", "Low", "Medium"]
ALLOWED_CARE_OPTIONS = ["No", "Not sure", "Yes"]

class PersonnelAssessmentInput(BaseModel):
    personnel_id: Optional[str] = Field(default=None, description="Pseudonymous personnel identifier")
    Gender: str = Field(..., description="Gender identity ('Male' or 'Female')")
    Country: str = Field(..., description="Country of residence or operational posting")
    Occupation: str = Field(..., description="Occupation role ('Corporate', 'Others', etc.)")
    self_employed: str = Field(..., description="Self-employed status ('No' or 'Yes')")
    family_history: str = Field(..., description="Family history of stress challenges ('No' or 'Yes')")
    Days_Indoors: str = Field(..., description="Typical duration spent indoors/confined")
    Changes_Habits: str = Field(..., description="Noticeable changes in daily habits ('Maybe', 'No', 'Yes')")
    Mental_Health_History: str = Field(..., description="Prior self-reported history of stress ('Maybe', 'No', 'Yes')")
    Mood_Swings: str = Field(..., description="Severity of observed mood fluctuations ('Low', 'Medium', 'High')")
    Coping_Struggles: str = Field(..., description="Experiencing struggles coping with stressors ('No' or 'Yes')")
    Work_Interest: str = Field(..., description="Change in work/duty engagement ('Maybe', 'No', 'Yes')")
    Social_Weakness: str = Field(..., description="Social withdrawal or unit strain ('Maybe', 'No', 'Yes')")
    care_options: str = Field(..., description="Awareness of care/support resources ('No', 'Not sure', 'Yes')")

    @field_validator("Gender")
    @classmethod
    def validate_gender(cls, v: str) -> str:
        if v not in ALLOWED_GENDER:
            raise ValueError(f"Gender must be one of: {ALLOWED_GENDER}")
        return v

    @field_validator("Occupation")
    @classmethod
    def validate_occupation(cls, v: str) -> str:
        if v not in ALLOWED_OCCUPATION:
            raise ValueError(f"Occupation must be one of: {ALLOWED_OCCUPATION}")
        return v

    @field_validator("self_employed", "family_history", "Coping_Struggles")
    @classmethod
    def validate_yes_no(cls, v: str) -> str:
        if v not in ALLOWED_YES_NO:
            raise ValueError(f"Value must be one of: {ALLOWED_YES_NO}")
        return v

    @field_validator("Days_Indoors")
    @classmethod
    def validate_days_indoors(cls, v: str) -> str:
        if v not in ALLOWED_DAYS_INDOORS:
            raise ValueError(f"Days_Indoors must be one of: {ALLOWED_DAYS_INDOORS}")
        return v

    @field_validator("Changes_Habits", "Mental_Health_History", "Work_Interest", "Social_Weakness")
    @classmethod
    def validate_tri_state(cls, v: str) -> str:
        if v not in ALLOWED_TRI_STATE:
            raise ValueError(f"Value must be one of: {ALLOWED_TRI_STATE}")
        return v

    @field_validator("Mood_Swings")
    @classmethod
    def validate_mood_swings(cls, v: str) -> str:
        if v not in ALLOWED_MOOD_SWINGS:
            raise ValueError(f"Mood_Swings must be one of: {ALLOWED_MOOD_SWINGS}")
        return v

    @field_validator("care_options")
    @classmethod
    def validate_care_options(cls, v: str) -> str:
        if v not in ALLOWED_CARE_OPTIONS:
            raise ValueError(f"care_options must be one of: {ALLOWED_CARE_OPTIONS}")
        return v

class PredictionResponse(BaseModel):
    prediction: str = Field(..., description="Predicted Growing_Stress category ('No', 'Maybe', or 'Yes')")
    probabilities: Dict[str, float] = Field(..., description="Exact class probabilities as percentages")
    confidence: float = Field(..., description="Top class confidence score")
    message: str = Field(..., description="Status summary")
    guidance: str = Field(..., description="Supportive welfare recommendation")
    disclaimer: str = Field(..., description="Responsible AI screening disclaimer")
    timestamp: str = Field(..., description="ISO timestamp")
    personnel_id: Optional[str] = Field(default=None, description="Pseudonymous personnel identifier")

# -----------------------------------------------------------------------------
# Welfare Guidance Generator
# -----------------------------------------------------------------------------
def get_welfare_guidance(prediction: str) -> str:
    if prediction == "No":
        return (
            "Routine Welfare Status: Continue routine welfare monitoring and maintain healthy coping, "
            "adequate rest intervals, physical readiness, and peer support practices."
        )
    elif prediction == "Maybe":
        return (
            "Elevated Monitoring Advised: Consider proactive welfare check-ins. Review current operational workload, "
            "sleep/rest patterns, coping strategies, and remind personnel of available unit welfare and support resources."
        )
    elif prediction == "Yes":
        return (
            "Actionable Follow-up Recommended: Consider timely, supportive human welfare follow-up and facilitated access "
            "to appropriate support services. This screening result should be reviewed by an authorized human welfare officer "
            "or support professional rather than treated as a diagnosis."
        )
    return "Maintain supportive unit welfare communication and regular health check-ins."

# -----------------------------------------------------------------------------
# Database Layer: Supabase PostgreSQL with Local File Fallback
# -----------------------------------------------------------------------------
def save_assessment_record(record: Dict[str, Any]):
    """Saves assessment to Supabase if configured, otherwise saves to local JSON store."""
    if SUPABASE_URL and SUPABASE_KEY:
        try:
            endpoint = f"{SUPABASE_URL}/rest/v1/assessments"
            headers = {
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            }
            db_payload = {
                "assessment_id": record.get("assessment_id"),
                "personnel_id": record.get("personnel_id"),
                "date": record.get("date"),
                "prediction": record.get("prediction"),
                "confidence": record.get("confidence"),
                "probabilities": record.get("probabilities"),
                "inputs": record.get("inputs"),
                "guidance": record.get("guidance", ""),
                "is_demo": record.get("is_demo", False)
            }
            with httpx.Client(timeout=10.0) as client:
                res = client.post(endpoint, headers=headers, json=db_payload)
                if res.status_code in [200, 201]:
                    logger.info(f"Successfully saved assessment {record.get('assessment_id')} to Supabase")
                    return
                else:
                    logger.warning(f"Supabase returned status {res.status_code}: {res.text}. Falling back to local store.")
        except Exception as e:
            logger.error(f"Error writing to Supabase: {e}. Falling back to local store.")

    # Local fallback
    try:
        assessments = []
        if ASSESSMENTS_FILE.exists():
            with open(ASSESSMENTS_FILE, "r", encoding="utf-8") as f:
                assessments = json.load(f)
        assessments.insert(0, record)
        assessments = assessments[:100]
        with open(ASSESSMENTS_FILE, "w", encoding="utf-8") as f:
            json.dump(assessments, f, indent=2)
    except Exception as e:
        logger.error(f"Failed to write to local assessments file: {e}")

def get_assessment_records() -> List[Dict[str, Any]]:
    """Retrieves assessments from Supabase if configured, otherwise reads from local JSON store."""
    if SUPABASE_URL and SUPABASE_KEY:
        try:
            endpoint = f"{SUPABASE_URL}/rest/v1/assessments?select=*&order=created_at.desc&limit=50"
            headers = {
                "apikey": SUPABASE_KEY,
                "Authorization": f"Bearer {SUPABASE_KEY}",
                "Accept": "application/json"
            }
            with httpx.Client(timeout=10.0) as client:
                res = client.get(endpoint, headers=headers)
                if res.status_code == 200:
                    return res.json()
                else:
                    logger.warning(f"Supabase GET failed with {res.status_code}. Reading local store.")
        except Exception as e:
            logger.error(f"Error querying Supabase: {e}. Reading local store.")

    if not ASSESSMENTS_FILE.exists():
        return []
    try:
        with open(ASSESSMENTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to read assessments store: {e}")
        return []

# -----------------------------------------------------------------------------
# API Endpoints
# -----------------------------------------------------------------------------

@app.get("/", tags=["General"])
def root():
    return {
        "status": "online",
        "service": "MWI · Mission Wellbeing API",
        "description": "AI-Based Predictive Personnel Stress & Welfare Monitoring System",
        "database": "Supabase PostgreSQL" if (SUPABASE_URL and SUPABASE_KEY) else "Local File Store",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", tags=["General"])
def health_check():
    global model_pipeline
    is_loaded = model_pipeline is not None
    return {
        "status": "healthy" if is_loaded else "degraded",
        "model_loaded": is_loaded,
        "database_connected": bool(SUPABASE_URL and SUPABASE_KEY),
        "database_type": "Supabase" if (SUPABASE_URL and SUPABASE_KEY) else "Local Store",
        "model_file": str(MODEL_PATH.name),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/model-info", tags=["Machine Learning"])
def model_info():
    global model_pipeline
    if model_pipeline is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Trained ML model pipeline is not currently loaded."
        )

    feature_names = [
        "Gender", "Country", "Occupation", "self_employed", "family_history",
        "Days_Indoors", "Changes_Habits", "Mental_Health_History", "Mood_Swings",
        "Coping_Struggles", "Work_Interest", "Social_Weakness", "care_options"
    ]
    classes = list(getattr(model_pipeline, "classes_", ["Maybe", "No", "Yes"]))

    return {
        "model_type": type(model_pipeline).__name__,
        "target": "Growing_Stress",
        "classes": classes,
        "feature_count": len(feature_names),
        "features": feature_names,
        "categories": {
            "Gender": ALLOWED_GENDER,
            "Occupation": ALLOWED_OCCUPATION,
            "self_employed": ALLOWED_YES_NO,
            "family_history": ALLOWED_YES_NO,
            "Days_Indoors": ALLOWED_DAYS_INDOORS,
            "Changes_Habits": ALLOWED_TRI_STATE,
            "Mental_Health_History": ALLOWED_TRI_STATE,
            "Mood_Swings": ALLOWED_MOOD_SWINGS,
            "Coping_Struggles": ALLOWED_YES_NO,
            "Work_Interest": ALLOWED_TRI_STATE,
            "Social_Weakness": ALLOWED_TRI_STATE,
            "care_options": ALLOWED_CARE_OPTIONS
        }
    }

@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
def predict_stress(assessment: PersonnelAssessmentInput):
    global model_pipeline
    if model_pipeline is None:
        model_pipeline = load_ml_model()
        if model_pipeline is None:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Prediction model is not available. Please verify personnel_stress_model.pkl exists."
            )

    try:
        input_dict = {
            "Gender": assessment.Gender,
            "Country": assessment.Country,
            "Occupation": assessment.Occupation,
            "self_employed": assessment.self_employed,
            "family_history": assessment.family_history,
            "Days_Indoors": assessment.Days_Indoors,
            "Changes_Habits": assessment.Changes_Habits,
            "Mental_Health_History": assessment.Mental_Health_History,
            "Mood_Swings": assessment.Mood_Swings,
            "Coping_Struggles": assessment.Coping_Struggles,
            "Work_Interest": assessment.Work_Interest,
            "Social_Weakness": assessment.Social_Weakness,
            "care_options": assessment.care_options
        }

        df = pd.DataFrame([input_dict])
        prediction = model_pipeline.predict(df)[0]
        prediction_str = str(prediction)

        probabilities_dict = {}
        confidence = 100.0
        if hasattr(model_pipeline, "predict_proba"):
            probs = model_pipeline.predict_proba(df)[0]
            classes = list(model_pipeline.classes_)
            probabilities_dict = {
                str(cls): round(float(prob) * 100, 1)
                for cls, prob in zip(classes, probs)
            }
            confidence = probabilities_dict.get(prediction_str, round(float(max(probs)) * 100, 1))

        guidance = get_welfare_guidance(prediction_str)
        disclaimer = "AI-assisted screening only — not a clinical or medical diagnosis."
        timestamp = datetime.now().isoformat()
        personnel_id = assessment.personnel_id or f"UF-{datetime.now().strftime('%M%S')}"

        result = {
            "prediction": prediction_str,
            "probabilities": probabilities_dict,
            "confidence": confidence,
            "message": "AI-assisted stress screening completed.",
            "guidance": guidance,
            "disclaimer": disclaimer,
            "timestamp": timestamp,
            "personnel_id": personnel_id
        }

        # Save to database (Supabase or local fallback)
        history_record = {
            "assessment_id": f"AST-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "personnel_id": personnel_id,
            "timestamp": timestamp,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
            "prediction": prediction_str,
            "confidence": confidence,
            "probabilities": probabilities_dict,
            "inputs": input_dict,
            "guidance": guidance,
            "is_demo": False
        }
        save_assessment_record(history_record)

        return result

    except Exception as e:
        logger.error(f"Error during model prediction: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Prediction could not be completed. Please verify the submitted information and try again."
        )

@app.get("/assessments", tags=["Welfare History"])
def list_assessments():
    assessments = get_assessment_records()
    return {
        "count": len(assessments),
        "source": "Supabase" if (SUPABASE_URL and SUPABASE_KEY) else "Local Store",
        "assessments": assessments
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
