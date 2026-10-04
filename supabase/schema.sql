-- ============================================================================
-- Supabase PostgreSQL Schema for Personnel Stress & Welfare Monitoring System
-- Run this script in the Supabase SQL Editor (SQL Editor -> New Query -> Run)
-- ============================================================================

-- Create the assessments table to persistently store evaluated screenings
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id TEXT UNIQUE NOT NULL,
    personnel_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    date TEXT NOT NULL,
    prediction TEXT NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL,
    probabilities JSONB NOT NULL,
    inputs JSONB NOT NULL,
    guidance TEXT,
    is_demo BOOLEAN DEFAULT FALSE
);

-- Create index on created_at and personnel_id for fast queries
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON public.assessments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessments_personnel_id ON public.assessments(personnel_id);

-- Enable Row Level Security (RLS) for data governance
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Allow public reads for dashboard reporting
CREATE POLICY "Allow public read of assessments"
    ON public.assessments
    FOR SELECT
    USING (true);

-- Allow authenticated or API key inserts
CREATE POLICY "Allow inserts with valid API key"
    ON public.assessments
    FOR INSERT
    WITH CHECK (true);

-- Optional initial benchmark records
INSERT INTO public.assessments (assessment_id, personnel_id, date, prediction, confidence, probabilities, inputs, is_demo)
VALUES 
(
    'AST-20261001-01', 
    'UF-1082', 
    '2026-10-01 09:15', 
    'No', 
    76.4, 
    '{"No": 76.4, "Maybe": 14.8, "Yes": 8.8}'::jsonb, 
    '{"Gender": "Male", "Country": "United States", "Occupation": "Corporate", "self_employed": "No", "family_history": "No", "Days_Indoors": "Go out Every day", "Changes_Habits": "No", "Mental_Health_History": "No", "Mood_Swings": "Low", "Coping_Struggles": "No", "Work_Interest": "No", "Social_Weakness": "No", "care_options": "Yes"}'::jsonb,
    TRUE
),
(
    'AST-20261001-02', 
    'UF-2419', 
    '2026-10-01 11:30', 
    'Maybe', 
    58.2, 
    '{"No": 24.1, "Maybe": 58.2, "Yes": 17.7}'::jsonb, 
    '{"Gender": "Female", "Country": "United Kingdom", "Occupation": "Others", "self_employed": "No", "family_history": "No", "Days_Indoors": "15-30 days", "Changes_Habits": "Maybe", "Mental_Health_History": "No", "Mood_Swings": "Medium", "Coping_Struggles": "No", "Work_Interest": "Maybe", "Social_Weakness": "Maybe", "care_options": "Not sure"}'::jsonb,
    TRUE
),
(
    'AST-20261002-01', 
    'UF-3814', 
    '2026-10-02 14:20', 
    'Yes', 
    68.9, 
    '{"No": 12.3, "Maybe": 18.8, "Yes": 68.9}'::jsonb, 
    '{"Gender": "Male", "Country": "India", "Occupation": "Corporate", "self_employed": "No", "family_history": "Yes", "Days_Indoors": "More than 2 months", "Changes_Habits": "Yes", "Mental_Health_History": "Yes", "Mood_Swings": "High", "Coping_Struggles": "Yes", "Work_Interest": "Yes", "Social_Weakness": "Yes", "care_options": "No"}'::jsonb,
    TRUE
)
ON CONFLICT (assessment_id) DO NOTHING;
