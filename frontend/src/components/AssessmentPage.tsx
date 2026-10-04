import React, { useState } from "react";
import type { AssessmentInputs } from "../types";
import { ArrowRight, ArrowLeft, Sparkles, AlertCircle } from "lucide-react";

interface AssessmentPageProps {
  onSubmit: (inputs: AssessmentInputs) => void;
  isSubmitting: boolean;
  error: string | null;
  onClearError: () => void;
}

const COUNTRIES = [
  "United States", "India", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Brazil", "South Africa", "Singapore",
  "Netherlands", "New Zealand", "Poland", "Philippines", "Sweden",
  "Switzerland", "Italy", "Ireland", "Israel", "Mexico",
  "Belgium", "Denmark", "Finland", "Portugal", "Russia",
  "Thailand", "Nigeria", "Colombia", "Croatia", "Czech Republic",
  "Costa Rica", "Bosnia and Herzegovina", "Georgia", "Greece", "Moldova"
];

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  onSubmit,
  isSubmitting,
  error,
  onClearError,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State matching exact 13 backend features
  const [formData, setFormData] = useState<AssessmentInputs>({
    personnel_id: `UF-${Math.floor(1000 + Math.random() * 9000)}`,
    Gender: "Male",
    Country: "United States",
    Occupation: "Corporate",
    self_employed: "No",
    family_history: "No",
    Days_Indoors: "1-14 days",
    Changes_Habits: "No",
    Mental_Health_History: "No",
    Mood_Swings: "Low",
    Coping_Struggles: "No",
    Work_Interest: "No",
    Social_Weakness: "No",
    care_options: "Yes",
  });

  const updateField = (field: keyof AssessmentInputs, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) onClearError();
  };

  // Quick Demo Profiles for instant testing
  const loadDemoProfile = (type: "routine" | "moderate" | "actionable") => {
    if (type === "routine") {
      setFormData({
        personnel_id: `UF-${Math.floor(1000 + Math.random() * 9000)}`,
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
        care_options: "Yes",
      });
    } else if (type === "moderate") {
      setFormData({
        personnel_id: `UF-${Math.floor(1000 + Math.random() * 9000)}`,
        Gender: "Female",
        Country: "United Kingdom",
        Occupation: "Others",
        self_employed: "No",
        family_history: "No",
        Days_Indoors: "15-30 days",
        Changes_Habits: "Maybe",
        Mental_Health_History: "Maybe",
        Mood_Swings: "Medium",
        Coping_Struggles: "No",
        Work_Interest: "Maybe",
        Social_Weakness: "Maybe",
        care_options: "Not sure",
      });
    } else {
      setFormData({
        personnel_id: `UF-${Math.floor(1000 + Math.random() * 9000)}`,
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
        care_options: "No",
      });
    }
    setCurrentStep(4); // Jump directly to Review
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Page Editorial Header */}
        <div className="mb-12">
          <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary block mb-3">
            [ SCREENING PROTOCOL ]
          </span>
          <h1 className="h1-display text-foreground max-w-3xl mb-4">
            PERSONNEL<br />
            STRESS<br />
            ASSESSMENT
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Complete the assessment to generate an AI-assisted Growing Stress prediction.
          </p>
        </div>

        {/* Quick Demo Presets Bar */}
        <div className="mb-12 p-6 bg-card border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-archivo font-bold uppercase tracking-widest text-foreground">
              PRESET DEMO PROFILES:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => loadDemoProfile("routine")}
              className="px-3.5 py-1.5 bg-background hover:border-primary border border-border text-xs font-archivo font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all"
            >
              🟢 Routine Baseline (Expected: No)
            </button>
            <button
              type="button"
              onClick={() => loadDemoProfile("moderate")}
              className="px-3.5 py-1.5 bg-background hover:border-primary border border-border text-xs font-archivo font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all"
            >
              🟡 Mixed Indicators (Expected: Maybe)
            </button>
            <button
              type="button"
              onClick={() => loadDemoProfile("actionable")}
              className="px-3.5 py-1.5 bg-background hover:border-primary border border-border text-xs font-archivo font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all"
            >
              🔴 High Accumulation (Expected: Yes)
            </button>
          </div>
        </div>

        {/* Stepper Navigation Indicator */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-12">
          {[
            { step: 1, label: "01 PROFILE" },
            { step: 2, label: "02 WORK CONTEXT" },
            { step: 3, label: "03 WELLBEING" },
            { step: 4, label: "04 REVIEW & SUBMIT" },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`p-3 md:p-4 text-left border-b-2 font-archivo text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${
                currentStep === s.step
                  ? "border-primary text-primary bg-card"
                  : currentStep > s.step
                  ? "border-primary/50 text-foreground bg-card/50"
                  : "border-border text-muted-foreground bg-transparent"
              }`}
            >
              <span className="block truncate">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-950/40 border-2 border-red-500/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-archivo font-black text-sm uppercase tracking-wider text-red-200">
                ASSESSMENT SERVICE UNAVAILABLE
              </h4>
              <p className="text-xs text-red-300 mt-1 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Main Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* STEP 01 — PROFILE */}
          {currentStep === 1 && (
            <div className="bg-card border border-border p-8 md:p-12 space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest block mb-1">
                  STAGE 01
                </span>
                <h3 className="h3-display text-2xl text-foreground">DEMOGRAPHIC & PROFILE INFORMATION</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pseudonymous Personnel ID */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Personnel ID <span className="text-muted-foreground font-normal">(Pseudonymous)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.personnel_id}
                    onChange={(e) => updateField("personnel_id", e.target.value)}
                    className="w-full px-4 py-3.5 bg-background border border-border focus:border-primary text-foreground font-archivo text-sm outline-none transition-colors"
                    placeholder="UF-0000"
                    required
                  />
                  <p className="text-[11px] text-muted-foreground mt-1.5">
                    Non-identifying administrative tracking identifier.
                  </p>
                </div>

                {/* Gender (Segmented Control) */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Gender Identity
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Male", "Female"].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => updateField("Gender", g)}
                        className={`py-3 px-4 font-archivo font-bold text-sm uppercase tracking-wider border transition-all ${
                          formData.Gender === g
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-background border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Country / Jurisdiction
                  </label>
                  <select
                    value={formData.Country}
                    onChange={(e) => updateField("Country", e.target.value)}
                    className="w-full px-4 py-3.5 bg-background border border-border focus:border-primary text-foreground font-archivo text-sm outline-none transition-colors"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} className="bg-charcoal-900 text-foreground">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Operational Role (Occupation)
                  </label>
                  <select
                    value={formData.Occupation}
                    onChange={(e) => updateField("Occupation", e.target.value)}
                    className="w-full px-4 py-3.5 bg-background border border-border focus:border-primary text-foreground font-archivo text-sm outline-none transition-colors"
                  >
                    <option value="Corporate">Corporate / Administrative Staff</option>
                    <option value="Others">Others / Operational & Technical</option>
                    <option value="Business">Business / Logistics Command</option>
                    <option value="Student">Student / Cadet Trainee</option>
                    <option value="Housewife">Domestic / Caregiver Duty</option>
                  </select>
                </div>

                {/* self_employed */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Self-Employed / Independent Duty Structure
                  </label>
                  <div className="grid grid-cols-2 max-w-md gap-3">
                    {["No", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("self_employed", val)}
                        className={`py-3 px-4 font-archivo font-bold text-sm uppercase tracking-wider border transition-all ${
                          formData.self_employed === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                        }`}
                      >
                        {val === "No" ? "No (Permanent Force)" : "Yes (Contract/Special)"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 02 — WORK / BACKGROUND */}
          {currentStep === 2 && (
            <div className="bg-card border border-border p-8 md:p-12 space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest block mb-1">
                  STAGE 02
                </span>
                <h3 className="h3-display text-2xl text-foreground">WORK ROTATION & BACKGROUND CONTEXT</h3>
              </div>

              <div className="space-y-8">
                {/* Family History of Mental Health Conditions */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-1">
                    Family History of Mental Health Conditions
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Any known family history of chronic stress or mental health conditions.
                  </p>
                  <div className="grid grid-cols-2 max-w-md gap-3">
                    {["No", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("family_history", val)}
                        className={`py-3 px-4 font-archivo font-bold text-sm uppercase tracking-wider border transition-all ${
                          formData.family_history === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Days Usually Spent Indoors */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-1">
                    Days Usually Spent Indoors / Operational Confinement
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Typical rotation spent indoors or confined on duty.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { val: "Go out Every day", label: "Go out Every day" },
                      { val: "1-14 days", label: "1-14 Days" },
                      { val: "15-30 days", label: "15-30 Days" },
                      { val: "31-60 days", label: "31-60 Days" },
                      { val: "More than 2 months", label: "> 2 Months" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.val}
                        onClick={() => updateField("Days_Indoors", item.val)}
                        className={`p-3 text-center font-archivo font-bold text-xs uppercase tracking-wider border transition-all ${
                          formData.Days_Indoors === item.val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 03 — WELLBEING */}
          {currentStep === 3 && (
            <div className="bg-card border border-border p-8 md:p-12 space-y-8 animate-in fade-in duration-200">
              <div className="border-b border-border pb-4">
                <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest block mb-1">
                  STAGE 03
                </span>
                <h3 className="h3-display text-2xl text-foreground">WELLBEING & COPING INDICATORS</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Changes in Habits */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Changes in Habits
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["No", "Maybe", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("Changes_Habits", val)}
                        className={`py-2.5 px-3 font-archivo font-bold text-xs uppercase tracking-wider border transition-all ${
                          formData.Changes_Habits === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mental Health History */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Mental Health History (Prior Personal)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["No", "Maybe", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("Mental_Health_History", val)}
                        className={`py-2.5 px-3 font-archivo font-bold text-xs uppercase tracking-wider border transition-all ${
                          formData.Mental_Health_History === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood Swings */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Observed Mood Swings
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Low", "Medium", "High"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("Mood_Swings", val)}
                        className={`py-2.5 px-3 font-archivo font-bold text-xs uppercase tracking-wider border transition-all ${
                          formData.Mood_Swings === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coping Struggles */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Experiencing Coping Struggles
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["No", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("Coping_Struggles", val)}
                        className={`py-2.5 px-3 font-archivo font-bold text-xs uppercase tracking-wider border transition-all ${
                          formData.Coping_Struggles === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Interest */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Change in Work Interest
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["No", "Maybe", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("Work_Interest", val)}
                        className={`py-2.5 px-3 font-archivo font-bold text-xs uppercase tracking-wider border transition-all ${
                          formData.Work_Interest === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Weakness */}
                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Social Weakness / Unit Withdrawal
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["No", "Maybe", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("Social_Weakness", val)}
                        className={`py-2.5 px-3 font-archivo font-bold text-xs uppercase tracking-wider border transition-all ${
                          formData.Social_Weakness === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 04 — SUPPORT & REVIEW */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Support Resources Field */}
              <div className="bg-card border border-border p-8 md:p-12">
                <div className="border-b border-border pb-4 mb-6">
                  <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest block mb-1">
                    STAGE 04
                  </span>
                  <h3 className="h3-display text-2xl text-foreground">SUPPORT RESOURCES</h3>
                </div>

                <div>
                  <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
                    Awareness of Mental Health Care Options
                  </label>
                  <p className="text-xs text-muted-foreground mb-3">
                    Is the individual aware of available internal care options and unit welfare assistance channels?
                  </p>
                  <div className="grid grid-cols-3 max-w-lg gap-3">
                    {["No", "Not sure", "Yes"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => updateField("care_options", val)}
                        className={`py-3 px-4 font-archivo font-bold text-sm uppercase tracking-wider border transition-all ${
                          formData.care_options === val
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Screen (Editorial Two-Column Layout) */}
              <div className="bg-card border-2 border-border p-8 md:p-12">
                <div className="border-b border-border pb-4 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest block mb-1">
                      VERIFICATION
                    </span>
                    <h3 className="h3-display text-2xl text-foreground">REVIEW YOUR INPUT</h3>
                  </div>
                  <span className="text-xs font-archivo font-bold uppercase text-muted-foreground bg-background px-3 py-1 border border-border">
                    13 INDICATORS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm font-archivo">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">GENDER</span>
                    <span className="font-bold text-foreground">{formData.Gender}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">COUNTRY</span>
                    <span className="font-bold text-foreground">{formData.Country}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">OCCUPATION</span>
                    <span className="font-bold text-foreground">{formData.Occupation}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">SELF-EMPLOYED</span>
                    <span className="font-bold text-foreground">{formData.self_employed}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">FAMILY HISTORY</span>
                    <span className="font-bold text-foreground">{formData.family_history}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">DAYS INDOORS</span>
                    <span className="font-bold text-foreground">{formData.Days_Indoors}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">CHANGES IN HABITS</span>
                    <span className="font-bold text-foreground">{formData.Changes_Habits}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">MENTAL HEALTH HISTORY</span>
                    <span className="font-bold text-foreground">{formData.Mental_Health_History}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">MOOD SWINGS</span>
                    <span className="font-bold text-foreground">{formData.Mood_Swings}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">COPING STRUGGLES</span>
                    <span className="font-bold text-foreground">{formData.Coping_Struggles}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">WORK INTEREST</span>
                    <span className="font-bold text-foreground">{formData.Work_Interest}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground uppercase text-xs font-bold">SOCIAL WEAKNESS</span>
                    <span className="font-bold text-foreground">{formData.Social_Weakness}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border md:col-span-2">
                    <span className="text-muted-foreground uppercase text-xs font-bold">CARE OPTIONS AWARENESS</span>
                    <span className="font-bold text-foreground">{formData.care_options}</span>
                  </div>
                </div>

                {/* Final Submission Action */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-muted-foreground">
                    * The target Growing_Stress is generated dynamically by the backend ML pipeline.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-lime-bright text-primary-foreground font-archivo font-black text-base uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>GENERATE AI ASSESSMENT</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 bg-card border border-border hover:border-muted-foreground text-foreground font-archivo font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>PREVIOUS</span>
              </button>
            ) : <div />}

            {currentStep < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 bg-primary hover:bg-lime-bright text-primary-foreground font-archivo font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
              >
                <span>NEXT STAGE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </form>

      </div>
    </section>
  );
};
