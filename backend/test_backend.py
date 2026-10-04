import sys
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_endpoints():
    print("Testing GET / ...")
    res = client.get("/")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    print("GET / passed:", res.json())

    print("\nTesting GET /health ...")
    res = client.get("/health")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    health = res.json()
    assert health["model_loaded"] is True, "Model should be loaded!"
    print("GET /health passed:", health)

    print("\nTesting GET /model-info ...")
    res = client.get("/model-info")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    info = res.json()
    assert info["feature_count"] == 13
    assert set(info["classes"]) == {"Maybe", "No", "Yes"}
    print("GET /model-info passed:", info["classes"])

    print("\nTesting POST /predict with sample data...")
    payload = {
        "personnel_id": "UF-TEST-01",
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
    res = client.post("/predict", json=payload)
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    print("POST /predict passed! Result:")
    print("  Prediction:", data["prediction"])
    print("  Probabilities:", data["probabilities"])
    print("  Confidence:", data["confidence"])
    print("  Guidance:", data["guidance"])
    assert data["prediction"] in ["No", "Maybe", "Yes"]
    assert "No" in data["probabilities"]
    assert "Maybe" in data["probabilities"]
    assert "Yes" in data["probabilities"]

    print("\nTesting POST /predict with invalid data (validation check)...")
    bad_payload = payload.copy()
    bad_payload["Gender"] = "UnknownGender"
    res = client.post("/predict", json=bad_payload)
    assert res.status_code == 422, f"Expected 422, got {res.status_code}"
    print("POST /predict validation rejection passed as expected (HTTP 422)")

    print("\nTesting GET /assessments ...")
    res = client.get("/assessments")
    assert res.status_code == 200
    assessments = res.json()
    assert assessments["count"] >= 1
    print("GET /assessments passed. Logged count:", assessments["count"])

    print("\nALL BACKEND TESTS PASSED SUCCESSFULLY! Model & API are verified!")

if __name__ == "__main__":
    test_endpoints()
