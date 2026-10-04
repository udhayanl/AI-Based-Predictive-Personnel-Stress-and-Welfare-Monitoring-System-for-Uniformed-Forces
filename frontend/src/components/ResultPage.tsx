import React from "react";
import { motion } from "framer-motion";
import type { PredictionResult } from "../types";
import { ArrowLeft, BarChart3, Heart, MessageSquare, Compass, Eye, AlertTriangle } from "lucide-react";

interface ResultPageProps {
  result: PredictionResult | null;
  onNewAssessment: () => void;
  onViewInsights: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  result,
  onNewAssessment,
  onViewInsights,
}) => {
  if (!result) {
    return (
      <div className="w-full py-24 text-center">
        <h2 className="h2-display mb-4">NO ASSESSMENT GENERATED</h2>
        <p className="text-muted-foreground mb-8">
          Please complete the assessment protocol to produce an AI-assisted welfare screening.
        </p>
        <button
          onClick={onNewAssessment}
          className="px-8 py-4 bg-primary text-primary-foreground font-archivo font-black uppercase tracking-wider"
        >
          START ASSESSMENT
        </button>
      </div>
    );
  }

  const { prediction, probabilities, confidence, personnel_id, inputs } = result;

  // Exact interpretations mandated by requirements
  const getInterpretation = (pred: string) => {
    if (pred === "Yes") {
      return "The model identified patterns associated with Growing Stress in the information provided. This is an AI-assisted screening result, not a medical diagnosis.";
    }
    if (pred === "Maybe") {
      return "The model identified a mixed pattern of indicators associated with Growing Stress. Consider this result as a signal for reflection and possible welfare support, not as a diagnosis.";
    }
    return "The model did not identify a strong pattern associated with Growing Stress in the information provided. This does not mean that wellbeing concerns are absent.";
  };

  const probNo = probabilities?.No ?? 0;
  const probMaybe = probabilities?.Maybe ?? 0;
  const probYes = probabilities?.Yes ?? 0;

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary block mb-3">
            [ SCREENING COMPLETE · {personnel_id || "UF-RECORD"} ]
          </span>
          <h1 className="h1-display text-foreground max-w-3xl mb-4">
            YOUR AI-ASSISTED<br />
            WELFARE INSIGHT
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Model inference generated via scikit-learn Random Forest classification pipeline.
          </p>
        </div>

        {/* Primary Outcome Card */}
        <div className="bg-card border-2 border-border p-8 md:p-14 mb-12 shadow-2xl relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Result Highlight */}
            <div className="lg:col-span-6">
              <span className="text-xs font-archivo font-bold uppercase tracking-widest text-muted-foreground block mb-3">
                PREDICTED GROWING STRESS
              </span>
              <div className="font-archivo font-black text-6xl sm:text-8xl uppercase tracking-tighter text-primary leading-none mb-4">
                {prediction}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border text-xs font-archivo font-bold text-foreground uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>MODEL CONFIDENCE: {confidence.toFixed(1)}%</span>
              </div>
            </div>

            {/* Right: What This Means */}
            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-10">
              <span className="text-xs font-archivo font-bold uppercase tracking-widest text-primary block mb-3">
                WHAT THIS MEANS
              </span>
              <p className="text-foreground text-lg leading-relaxed font-archivo mb-4">
                {getInterpretation(prediction)}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                * Note: Prediction represents statistical model output on input features. Maintain supportive unit communication and routine check-ins.
              </p>
            </div>
          </div>
        </div>

        {/* Probability Visualization (Actual API Values with Animated Bars) */}
        <div className="bg-card border border-border p-8 md:p-12 mb-12">
          <div className="flex items-center justify-between pb-6 border-b border-border mb-8">
            <div>
              <span className="text-xs font-archivo font-bold uppercase tracking-widest text-primary block mb-1">
                CALIBRATED PROBABILITIES
              </span>
              <h3 className="h3-display text-2xl text-foreground">CLASS PROBABILITY DISTRIBUTION</h3>
            </div>
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-6">
            {/* NO */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-archivo">
                <span className={`font-bold uppercase tracking-wider ${prediction === "No" ? "text-primary" : "text-muted-foreground"}`}>
                  NO (ROUTINE WELFARE PATTERN) {prediction === "No" && "— PREDICTED"}
                </span>
                <span className={`font-black text-lg ${prediction === "No" ? "text-primary" : "text-foreground"}`}>
                  {probNo.toFixed(1)}%
                </span>
              </div>
              <div className="h-4 bg-background border border-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${probNo}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full ${prediction === "No" ? "bg-primary" : "bg-muted-foreground/40"}`}
                />
              </div>
            </div>

            {/* MAYBE */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-archivo">
                <span className={`font-bold uppercase tracking-wider ${prediction === "Maybe" ? "text-primary" : "text-muted-foreground"}`}>
                  MAYBE (MIXED INDICATORS) {prediction === "Maybe" && "— PREDICTED"}
                </span>
                <span className={`font-black text-lg ${prediction === "Maybe" ? "text-primary" : "text-foreground"}`}>
                  {probMaybe.toFixed(1)}%
                </span>
              </div>
              <div className="h-4 bg-background border border-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${probMaybe}%` }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full ${prediction === "Maybe" ? "bg-primary" : "bg-muted-foreground/40"}`}
                />
              </div>
            </div>

            {/* YES */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-archivo">
                <span className={`font-bold uppercase tracking-wider ${prediction === "Yes" ? "text-primary" : "text-muted-foreground"}`}>
                  YES (GROWING STRESS PATTERN) {prediction === "Yes" && "— PREDICTED"}
                </span>
                <span className={`font-black text-lg ${prediction === "Yes" ? "text-primary" : "text-foreground"}`}>
                  {probYes.toFixed(1)}%
                </span>
              </div>
              <div className="h-4 bg-background border border-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${probYes}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full ${prediction === "Yes" ? "bg-primary" : "bg-muted-foreground/40"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Signature AI Signal Meters */}
        {inputs && (
          <div className="bg-card border border-border p-8 md:p-12 mb-12">
            <div className="border-b border-border pb-4 mb-6">
              <span className="text-xs font-archivo font-bold uppercase tracking-widest text-primary block mb-1">
                EVALUATED ATTRIBUTES
              </span>
              <h3 className="h3-display text-2xl text-foreground">AI SIGNAL METERS</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background border border-border p-5">
                <span className="text-[11px] font-archivo font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                  WORK INTEREST
                </span>
                <span className="font-archivo font-black text-xl text-primary uppercase">
                  {inputs.Work_Interest}
                </span>
              </div>
              <div className="bg-background border border-border p-5">
                <span className="text-[11px] font-archivo font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                  MOOD SWINGS
                </span>
                <span className="font-archivo font-black text-xl text-primary uppercase">
                  {inputs.Mood_Swings}
                </span>
              </div>
              <div className="bg-background border border-border p-5">
                <span className="text-[11px] font-archivo font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                  COPING STRUGGLES
                </span>
                <span className="font-archivo font-black text-xl text-primary uppercase">
                  {inputs.Coping_Struggles}
                </span>
              </div>
              <div className="bg-background border border-border p-5">
                <span className="text-[11px] font-archivo font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                  SOCIAL WEAKNESS
                </span>
                <span className="font-archivo font-black text-xl text-primary uppercase">
                  {inputs.Social_Weakness}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Welfare Support Section: "SUPPORT, NOT LABELS." */}
        <div className="mb-12">
          <div className="mb-8">
            <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              ACTIONABLE WELFARE PATHWAYS
            </span>
            <h2 className="h2-display text-foreground">SUPPORT, NOT LABELS.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-2xl font-black text-primary font-archivo block mb-3">01</span>
                <h4 className="font-black text-base uppercase text-foreground mb-2">TAKE A MOMENT</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Consider rest, recovery, and healthy routines.
                </p>
              </div>
              <Heart className="w-4 h-4 text-primary mt-4" />
            </div>

            <div className="bg-card border border-border p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-2xl font-black text-primary font-archivo block mb-3">02</span>
                <h4 className="font-black text-base uppercase text-foreground mb-2">TALK TO SOMEONE</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  If concerns persist, consider speaking with a trusted person or appropriate welfare professional.
                </p>
              </div>
              <MessageSquare className="w-4 h-4 text-primary mt-4" />
            </div>

            <div className="bg-card border border-border p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-2xl font-black text-primary font-archivo block mb-3">03</span>
                <h4 className="font-black text-base uppercase text-foreground mb-2">USE AVAILABLE SUPPORT</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Explore the support resources available through your organization.
                </p>
              </div>
              <Compass className="w-4 h-4 text-primary mt-4" />
            </div>

            <div className="bg-card border border-border p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-2xl font-black text-primary font-archivo block mb-3">04</span>
                <h4 className="font-black text-base uppercase text-foreground mb-2">KEEP HUMAN REVIEW</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  AI outputs should support human judgement rather than replace it.
                </p>
              </div>
              <Eye className="w-4 h-4 text-primary mt-4" />
            </div>
          </div>
        </div>

        {/* Mandatory Prominent Disclaimer Card */}
        <div className="p-8 bg-charcoal-900 border-2 border-border mb-12">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <h4 className="font-archivo font-black text-xs uppercase tracking-widest text-primary">
              IMPORTANT GOVERNANCE NOTICE
            </h4>
          </div>
          <p className="text-sm font-archivo text-foreground leading-relaxed max-w-4xl">
            This system provides an AI-assisted screening estimate based on the information entered and the underlying training dataset. It is not a medical diagnosis and should not be used by itself for disciplinary, employment, deployment, promotion, punishment, or other high-impact decisions. Human judgement and appropriate welfare support remain essential.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onNewAssessment}
            className="px-8 py-4 bg-primary hover:bg-lime-bright text-primary-foreground font-archivo font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>NEW ASSESSMENT</span>
          </button>

          <button
            onClick={onViewInsights}
            className="px-8 py-4 bg-card hover:bg-background border border-border hover:border-primary text-foreground font-archivo font-black text-sm uppercase tracking-wider transition-all"
          >
            VIEW INSIGHTS DASHBOARD
          </button>
        </div>

      </div>
    </section>
  );
};
