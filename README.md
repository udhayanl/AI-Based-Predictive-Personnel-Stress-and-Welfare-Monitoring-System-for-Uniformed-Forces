# AI-Based Predictive Personnel Stress & Welfare Monitoring System for Uniformed Forces

An end-to-end full-stack college project integrating a trained machine-learning pipeline with a FastAPI backend and a modern administrative welfare dashboard frontend.

---

## ⚠️ Important Academic & Responsible AI Context

* **Decision-Support Prototype**: This system is designed as an AI-assisted stress/welfare screening and decision-support system for personnel welfare monitoring.
* **Non-Clinical Screening Only**: The system does **NOT** claim to diagnose mental illness or provide medical/clinical diagnoses.
* **Non-Punitive Mandate**: This system must **NOT** be used as the sole basis for disciplinary, employment, deployment, promotion, punishment, or other high-impact decisions.
* **Dataset Limitations**: The model was trained on a general workplace mental health dataset and serves as an exploratory academic prototype.

---

## 📁 Project Directory Structure

```
personnel-stress-ai/
│
├── backend/
│   ├── main.py                     # FastAPI application with ML inference logic
│   ├── personnel_stress_model.pkl  # Trained scikit-learn pipeline (~60.6 MB)
│   ├── inspect_model.py            # Inspection script to extract pipeline metadata
│   ├── test_backend.py             # Automated unit/integration tests for API
│   ├── requirements.txt            # Python backend dependencies
│   └── README.md                   # Backend documentation
│
├── frontend/
│   ├── index.html                  # Responsive 6-view single-page application
│   ├── css/
│   │   └── style.css               # Design system, dark theme, animations
│   ├── js/
│   │   ├── config.js               # API URL configuration and storage
│   │   ├── api.js                  # Client API service with error handling
│   │   ├── data.js                 # Local history store & CSV/JSON export
│   │   ├── charts.js               # Self-contained SVG Donut & Bar charts
│   │   └── app.js                  # Routing, form validation, and event handling
│   └── README.md                   # Frontend documentation
│
├── test_integration.py             # Full-stack end-to-end test script
└── README.md                       # Complete project guide
```

---

## 🧠 Machine Learning Model Details

* **Target Variable**: `Growing_Stress`
* **Target Classes**: `No`, `Maybe`, `Yes`
* **Model Type**: Scikit-Learn `Pipeline`
  * **Step 1 (`preprocessor`)**: `ColumnTransformer` with `OneHotEncoder`
  * **Step 2 (`classifier`)**: `RandomForestClassifier`
* **Exact Model Input Features (13 features)**:
  1. `Gender` (`Male`, `Female`)
  2. `Country` (35 trained countries, e.g. `United States`, `India`, `United Kingdom`, `Canada`, etc.)
  3. `Occupation` (`Corporate`, `Others`, `Business`, `Student`, `Housewife`)
  4. `self_employed` (`No`, `Yes`)
  5. `family_history` (`No`, `Yes`)
  6. `Days_Indoors` (`1-14 days`, `15-30 days`, `31-60 days`, `Go out Every day`, `More than 2 months`)
  7. `Changes_Habits` (`Maybe`, `No`, `Yes`)
  8. `Mental_Health_History` (`Maybe`, `No`, `Yes`)
  9. `Mood_Swings` (`Low`, `Medium`, `High`)
  10. `Coping_Struggles` (`No`, `Yes`)
  11. `Work_Interest` (`Maybe`, `No`, `Yes`)
  12. `Social_Weakness` (`Maybe`, `No`, `Yes`)
  13. `care_options` (`No`, `Not sure`, `Yes`)

---

## 🚀 Step-by-Step Setup and Execution Guide

### 1. Where to Place `personnel_stress_model.pkl`
Place your trained model file directly inside the `backend/` folder:
```
backend/personnel_stress_model.pkl
```
*(The file is already placed in `backend/personnel_stress_model.pkl`).*

---

### 2. How to Install Dependencies

Open a terminal in the project directory and install the backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

*(Ensure `scikit-learn==1.6.1` is installed to match the pickle pipeline).*

---

### 3. How to Start the FastAPI Backend

From the `backend/` directory, launch the Uvicorn server:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The backend will start at:
* **API Base URL**: `http://127.0.0.1:8000`
* **Health Check**: `http://127.0.0.1:8000/health`
* **Model Info**: `http://127.0.0.1:8000/model-info`

---

### 4. How to Open `/docs` and Test Endpoints

Open your browser and navigate to:
* **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* **ReDoc UI**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

In the `/docs` UI:
1. Locate the **`POST /predict`** endpoint.
2. Click **"Try it out"**.
3. Use the pre-filled sample payload or customize values.
4. Click **"Execute"** to inspect the real-time prediction output and probability scores.

---

### 5. How to Start the Frontend

In a second terminal window, navigate to the `frontend/` directory and launch a static HTTP server:

```bash
cd frontend
python -m http.server 3000
```

Open your browser at:
* **Frontend Web App**: [http://localhost:3000](http://localhost:3000)

*(Alternatively, use VS Code "Live Server" or `npx serve -l 3000`).*

---

### 6. How the Frontend Connects to the Backend

* The frontend defaults to connecting to `http://127.0.0.1:8000`.
* The sidebar status indicator displays **"AI Model Ready (Online)"** with a glowing green dot when connected.
* **To change the API URL**: Click the status indicator at the bottom-left of the sidebar to open the **Backend Connection Settings** modal. You can set a custom host or cloud deployment URL anytime.

---

### 7. How to Test an End-to-End Prediction

1. In the frontend ([http://localhost:3000](http://localhost:3000)), click **"Start Assessment"** or navigate to **Stress Assessment** in the sidebar.
2. Under **Quick Demo Profiles** on the right side, click any preset profile (e.g. **🔴 High Stress Profile (Expected: Yes)** or **🟢 Routine Welfare Profile (Expected: No)**) to automatically fill the form fields.
3. Click **"Analyze Stress Indicators"**.
4. The system will display a loading animation, transmit the JSON payload to FastAPI `POST /predict`, evaluate through the Random Forest pipeline, and navigate to the **Prediction Result** view.
5. Review the dynamic output:
   * **Predicted Growing Stress**: `No`, `Maybe`, or `Yes`
   * **Class Probabilities Breakdown**: Exact percentages with colored progress bars
   * **Welfare Recommendation**: Contextual non-punitive guidance
   * **Submitted Features Summary**: All 13 evaluated parameters
6. Click **"View Dashboard"** to see the assessment aggregated into the **Growing Stress Distribution** Donut Chart and Recent Activity log.
7. Click **"Assessment History"** to search, filter, or export the log as CSV or JSON.

---

## 🧪 Automated Testing

To run the automated full-stack integration test suite:

```bash
python test_integration.py
```

This validates:
* Backend status and model availability
* `POST /predict` validation and probability calculations
* Frontend HTTP serving and static asset integrity
