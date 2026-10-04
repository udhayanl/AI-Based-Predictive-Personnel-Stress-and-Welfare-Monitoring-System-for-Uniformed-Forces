# Personnel Stress & Welfare Monitoring System — Backend

FastAPI backend service powering the **AI-Based Predictive Personnel Stress and Welfare Monitoring System for Uniformed Forces**.

## Features

- **Trained Pipeline Integration**: Directly loads the scikit-learn machine learning pipeline (`personnel_stress_model.pkl`) using `joblib`.
- **Exact 13-Feature Schema**: Fully validated against the model's exact feature names and preprocessor encodings.
- **Probabilistic Scoring**: Provides exact class probabilities (`No`, `Maybe`, `Yes`) alongside the predicted `Growing_Stress` category.
- **Responsible AI Screening Guidance**: Automatically attaches non-punitive, supportive welfare recommendations based on predicted stress tiers.
- **RESTful Endpoints & Auto-Documentation**: Swagger UI at `/docs` and ReDoc at `/redoc`.
- **CORS Configured**: Ready for decoupled frontend development on localhost origins.

## Directory Structure

```
backend/
├── main.py                     # FastAPI application with endpoints and ML inference logic
├── personnel_stress_model.pkl  # Trained scikit-learn model pipeline
├── inspect_model.py            # Diagnostic script to inspect model pipeline metadata
├── requirements.txt            # Python dependencies
└── README.md                   # Backend documentation
```

## Setup & Running

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```
*(Note: Ensure `scikit-learn==1.6.1` is installed to match the pipeline pickle version).*

### 2. Start the Backend Server
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and service overview |
| `GET` | `/health` | Health check verifying model pipeline is loaded |
| `GET` | `/model-info` | Metadata, target classes, and valid input values |
| `POST` | `/predict` | Evaluates assessment data and returns predicted stress & probabilities |
| `GET` | `/assessments` | Retrieves logged personnel welfare screenings |
| `GET` | `/docs` | Interactive Swagger API documentation |
| `GET` | `/redoc` | Interactive ReDoc documentation |

### 4. Sample `POST /predict` Payload

```json
{
  "personnel_id": "UF-8042",
  "Gender": "Male",
  "Country": "United States",
  "Occupation": "Corporate",
  "self_employed": "No",
  "family_history": "No",
  "Days_Indoors": "1-14 days",
  "Changes_Habits": "No",
  "Mental_Health_History": "No",
  "Mood_Swings": "Low",
  "Coping_Struggles": "No",
  "Work_Interest": "No",
  "Social_Weakness": "No",
  "care_options": "Yes"
}
```

### 5. Sample Response

```json
{
  "prediction": "Yes",
  "probabilities": {
    "Maybe": 20.3,
    "No": 28.6,
    "Yes": 51.1
  },
  "confidence": 51.1,
  "message": "AI-assisted stress screening completed.",
  "guidance": "Actionable Follow-up Recommended: Consider timely, supportive human welfare follow-up...",
  "disclaimer": "AI-assisted screening only — not a clinical or medical diagnosis.",
  "timestamp": "2026-10-04T12:30:00.000000",
  "personnel_id": "UF-8042"
}
```

## Responsible AI & Non-Medical Disclaimer

This application is an academic AI prototype designed strictly for decision-support and proactive welfare monitoring. It is **not** a diagnostic instrument, does not evaluate medical pathology, and must never be utilized as the sole foundation for disciplinary, promotion, deployment, or career-altering determinations.
