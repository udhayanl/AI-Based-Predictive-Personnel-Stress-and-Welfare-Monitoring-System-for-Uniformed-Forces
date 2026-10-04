export type GrowingStressClass = "No" | "Maybe" | "Yes";

export interface AssessmentInputs {
  personnel_id?: string;
  Gender: "Male" | "Female" | string;
  Country: string;
  Occupation: "Corporate" | "Others" | "Business" | "Student" | "Housewife" | string;
  self_employed: "No" | "Yes" | string;
  family_history: "No" | "Yes" | string;
  Days_Indoors: "1-14 days" | "15-30 days" | "31-60 days" | "Go out Every day" | "More than 2 months" | string;
  Changes_Habits: "No" | "Maybe" | "Yes" | string;
  Mental_Health_History: "No" | "Maybe" | "Yes" | string;
  Mood_Swings: "Low" | "Medium" | "High" | string;
  Coping_Struggles: "No" | "Yes" | string;
  Work_Interest: "No" | "Maybe" | "Yes" | string;
  Social_Weakness: "No" | "Maybe" | "Yes" | string;
  care_options: "No" | "Not sure" | "Yes" | string;
}

export interface PredictionResult {
  prediction: GrowingStressClass;
  probabilities: {
    No?: number;
    Maybe?: number;
    Yes?: number;
    [key: string]: number | undefined;
  };
  confidence: number;
  message: string;
  guidance: string;
  disclaimer: string;
  timestamp: string;
  personnel_id?: string;
  inputs?: AssessmentInputs;
}

export interface AssessmentRecord {
  assessment_id: string;
  personnel_id: string;
  date: string;
  prediction: GrowingStressClass;
  confidence: number;
  probabilities: {
    No?: number;
    Maybe?: number;
    Yes?: number;
  };
  inputs?: AssessmentInputs;
  is_demo?: boolean;
}
