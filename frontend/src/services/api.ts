import type { AssessmentInputs, PredictionResult, AssessmentRecord } from "../types";

const ENV_API_BASE = import.meta.env.VITE_API_BASE_URL ? String(import.meta.env.VITE_API_BASE_URL).trim() : "";
const DEFAULT_API_BASE = ENV_API_BASE || "http://127.0.0.1:8000";
const STORAGE_KEY_API = "mwi_api_base_url";
const STORAGE_KEY_RECORDS = "mwi_local_assessment_records";


export function getApiBaseUrl(): string {
  const saved = localStorage.getItem(STORAGE_KEY_API);
  return saved ? saved.trim() : DEFAULT_API_BASE;
}

export function setApiBaseUrl(url: string): string {
  const cleaned = (url || DEFAULT_API_BASE).replace(/\/+$/, "");
  localStorage.setItem(STORAGE_KEY_API, cleaned);
  return cleaned;
}

export function resetApiBaseUrl(): string {
  localStorage.removeItem(STORAGE_KEY_API);
  return DEFAULT_API_BASE;
}

// Baseline demo records (transparently marked as demo)
export const DEMO_BASELINE_RECORDS: AssessmentRecord[] = [
  {
    assessment_id: "AST-20261001-01",
    personnel_id: "UF-1082",
    date: "2026-10-01 09:15",
    prediction: "No",
    confidence: 76.4,
    probabilities: { No: 76.4, Maybe: 14.8, Yes: 8.8 },
    inputs: {
      Gender: "Male",
      Country: "United States",
      Occupation: "Corporate",
      self_employed: "No",
      family_history: "No",
      Days_Indoors: "Go out Every day",
      Changes_Habits: "No",
      Mental_Health_History: "No",
      Mood_Swings: "Low",
      Coping_Struggles: "No",
      Work_Interest: "No",
      Social_Weakness: "No",
      care_options: "Yes"
    },
    is_demo: true
  },
  {
    assessment_id: "AST-20261001-02",
    personnel_id: "UF-2419",
    date: "2026-10-01 11:30",
    prediction: "Maybe",
    confidence: 58.2,
    probabilities: { No: 24.1, Maybe: 58.2, Yes: 17.7 },
    inputs: {
      Gender: "Female",
      Country: "United Kingdom",
      Occupation: "Others",
      self_employed: "No",
      family_history: "No",
      Days_Indoors: "15-30 days",
      Changes_Habits: "Maybe",
      Mental_Health_History: "No",
      Mood_Swings: "Medium",
      Coping_Struggles: "No",
      Work_Interest: "Maybe",
      Social_Weakness: "Maybe",
      care_options: "Not sure"
    },
    is_demo: true
  },
  {
    assessment_id: "AST-20261002-01",
    personnel_id: "UF-3814",
    date: "2026-10-02 14:20",
    prediction: "Yes",
    confidence: 68.9,
    probabilities: { No: 12.3, Maybe: 18.8, Yes: 68.9 },
    inputs: {
      Gender: "Male",
      Country: "India",
      Occupation: "Corporate",
      self_employed: "No",
      family_history: "Yes",
      Days_Indoors: "More than 2 months",
      Changes_Habits: "Yes",
      Mental_Health_History: "Yes",
      Mood_Swings: "High",
      Coping_Struggles: "Yes",
      Work_Interest: "Yes",
      Social_Weakness: "Yes",
      care_options: "No"
    },
    is_demo: true
  },
  {
    assessment_id: "AST-20261002-02",
    personnel_id: "UF-4099",
    date: "2026-10-02 16:45",
    prediction: "No",
    confidence: 81.0,
    probabilities: { No: 81.0, Maybe: 12.0, Yes: 7.0 },
    inputs: {
      Gender: "Female",
      Country: "Canada",
      Occupation: "Others",
      self_employed: "No",
      family_history: "No",
      Days_Indoors: "1-14 days",
      Changes_Habits: "No",
      Mental_Health_History: "No",
      Mood_Swings: "Low",
      Coping_Struggles: "No",
      Work_Interest: "No",
      Social_Weakness: "No",
      care_options: "Yes"
    },
    is_demo: true
  },
  {
    assessment_id: "AST-20261003-01",
    personnel_id: "UF-5120",
    date: "2026-10-03 10:10",
    prediction: "Maybe",
    confidence: 62.5,
    probabilities: { No: 18.5, Maybe: 62.5, Yes: 19.0 },
    inputs: {
      Gender: "Male",
      Country: "Australia",
      Occupation: "Corporate",
      self_employed: "Yes",
      family_history: "No",
      Days_Indoors: "31-60 days",
      Changes_Habits: "Yes",
      Mental_Health_History: "Maybe",
      Mood_Swings: "Medium",
      Coping_Struggles: "No",
      Work_Interest: "Maybe",
      Social_Weakness: "Maybe",
      care_options: "Not sure"
    },
    is_demo: true
  }
];

export async function checkBackendHealth(): Promise<{ status: string; model_loaded: boolean }> {
  const base = getApiBaseUrl();
  try {
    const res = await fetch(`${base}/health`, {
      method: "GET",
      headers: { Accept: "application/json" }
    });
    if (!res.ok) {
      return { status: "offline", model_loaded: false };
    }
    const data = await res.json();
    return {
      status: data.status || "healthy",
      model_loaded: !!data.model_loaded
    };
  } catch (err) {
    return { status: "offline", model_loaded: false };
  }
}

export async function predictStressApi(inputs: AssessmentInputs): Promise<PredictionResult> {
  const base = getApiBaseUrl();
  try {
    const res = await fetch(`${base}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(inputs)
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      if (res.status === 422) {
        throw new Error("Validation Error: Please check all required fields.");
      }
      if (res.status === 503) {
        throw new Error(errorJson?.detail || "ML model pipeline not ready on server.");
      }
      throw new Error(errorJson?.detail || `Prediction request failed with HTTP ${res.status}`);
    }

    const data: PredictionResult = await res.json();
    data.inputs = inputs;

    // Save to local persistence
    saveLocalAssessment({
      assessment_id: `AST-${Date.now()}`,
      personnel_id: inputs.personnel_id || data.personnel_id || "UF-0000",
      date: new Date().toISOString().replace("T", " ").slice(0, 16),

      prediction: data.prediction,
      confidence: data.confidence,
      probabilities: data.probabilities,
      inputs: inputs,
      is_demo: false
    });

    return data;
  } catch (err: any) {
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      throw new Error("ASSESSMENT SERVICE UNAVAILABLE: The AI prediction service could not be reached. Please check the backend connection and try again.");
    }
    throw err;
  }
}

export function getLocalAssessments(includeDemo = true): AssessmentRecord[] {
  let localLive: AssessmentRecord[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    if (raw) localLive = JSON.parse(raw);
  } catch (e) {
    localLive = [];
  }

  if (includeDemo) {
    return [...localLive, ...DEMO_BASELINE_RECORDS];
  }
  return localLive;
}

export function saveLocalAssessment(record: AssessmentRecord): void {
  const current = getLocalAssessments(false);
  current.unshift(record);
  localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(current.slice(0, 100)));
}

export function exportAssessmentsToCSV(records: AssessmentRecord[]) {
  const headers = [
    "Assessment_ID",
    "Personnel_ID",
    "Date",
    "Predicted_Growing_Stress",
    "Confidence_Pct",
    "Prob_No",
    "Prob_Maybe",
    "Prob_Yes",
    "Data_Type"
  ];
  const rows = records.map(r => [
    `"${r.assessment_id}"`,
    `"${r.personnel_id}"`,
    `"${r.date}"`,
    `"${r.prediction}"`,
    r.confidence,
    r.probabilities?.No ?? "",
    r.probabilities?.Maybe ?? "",
    r.probabilities?.Yes ?? "",
    r.is_demo ? "Demo Baseline" : "Live Evaluation"
  ]);

  const csv = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mission_wellbeing_assessments_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAssessmentsToJSON(records: AssessmentRecord[]) {
  const jsonStr = JSON.stringify(records, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mission_wellbeing_assessments_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
