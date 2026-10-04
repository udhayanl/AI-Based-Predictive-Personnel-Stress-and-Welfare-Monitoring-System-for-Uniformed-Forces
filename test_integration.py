import urllib.request
import json

def test_full_pipeline():
    print("================================================================")
    print("INTEGRATION VERIFICATION: REACT + VITE + TAILWIND + FASTAPI")
    print("================================================================")

    # 1. FastAPI Health Check
    print("\n1. Testing FastAPI Backend (http://127.0.0.1:8000/health)...")
    with urllib.request.urlopen("http://127.0.0.1:8000/health") as res:
        health = json.loads(res.read().decode())
        print(f"   Status Code: {res.status}")
        print(f"   Model Loaded: {health.get('model_loaded')}")
        assert health.get("model_loaded") is True

    # 2. FastAPI Model Info
    print("\n2. Testing FastAPI Model Metadata (http://127.0.0.1:8000/model-info)...")
    with urllib.request.urlopen("http://127.0.0.1:8000/model-info") as res:
        info = json.loads(res.read().decode())
        print(f"   Target: {info.get('target')}")
        print(f"   Classes: {info.get('classes')}")
        print(f"   Input Features Count: {info.get('feature_count')}")
        assert info.get("feature_count") == 13
        assert set(info.get("classes")) == {"Maybe", "No", "Yes"}

    # 3. Model Prediction Pipeline
    print("\n3. Testing End-to-End Prediction (POST http://127.0.0.1:8000/predict)...")
    payload = {
        "personnel_id": "UF-VERIFY-2026",
        "Gender": "Male",
        "Country": "United States",
        "Occupation": "Corporate",
        "self_employed": "No",
        "family_history": "No",
        "Days_Indoors": "Go out Every day",
        "Changes_Habits": "No",
        "Mental_Health_History": "No",
        "Mood_Swings": "Low",
        "Coping_Struggles": "No",
        "Work_Interest": "No",
        "Social_Weakness": "No",
        "care_options": "Yes"
    }
    req = urllib.request.Request(
        "http://127.0.0.1:8000/predict",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as res:
        pred = json.loads(res.read().decode())
        print(f"   Status Code: {res.status}")
        print(f"   Predicted Growing_Stress: {pred.get('prediction')}")
        print(f"   Probabilities: {pred.get('probabilities')}")
        print(f"   Confidence Score: {pred.get('confidence')}%")
        assert pred.get("prediction") in ["No", "Maybe", "Yes"]
        assert "No" in pred.get("probabilities")
        assert "Maybe" in pred.get("probabilities")
        assert "Yes" in pred.get("probabilities")

    # 4. Vite React Frontend
    print("\n4. Testing React + Vite Frontend Server (http://127.0.0.1:3000)...")
    with urllib.request.urlopen("http://127.0.0.1:3000/") as res:
        html = res.read().decode()
        print(f"   Status Code: {res.status}")
        print(f"   HTML Response Size: {len(html)} bytes")
        assert "MISSION WELLBEING" in html
        assert "Archivo" in html
        assert "root" in html

    print("\n================================================================")
    print("SUCCESS: COMPLETE FULL-STACK MWI PLATFORM VERIFIED 100%!")
    print("================================================================")

if __name__ == "__main__":
    test_full_pipeline()
