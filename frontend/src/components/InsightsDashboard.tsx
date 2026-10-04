import React from "react";
import type { AssessmentRecord } from "../types";
import { ArrowUpRight, Activity } from "lucide-react";

interface InsightsDashboardProps {
  records: AssessmentRecord[];
  onStartAssessment: () => void;
  onViewHistory: () => void;
}

export const InsightsDashboard: React.FC<InsightsDashboardProps> = ({
  records,
  onStartAssessment,
  onViewHistory,
}) => {
  const total = records.length;
  const countYes = records.filter((r) => r.prediction === "Yes").length;
  const countMaybe = records.filter((r) => r.prediction === "Maybe").length;
  const countNo = records.filter((r) => r.prediction === "No").length;

  const pctYes = total ? Math.round((countYes / total) * 100) : 0;
  const pctMaybe = total ? Math.round((countMaybe / total) * 100) : 0;
  const pctNo = total ? Math.round((countNo / total) * 100) : 0;

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary block mb-3">
            [ AGGREGATED METRICS ]
          </span>
          <h1 className="h1-display text-foreground max-w-3xl mb-4">
            WELFARE<br />
            INTELLIGENCE<br />
            CENTER
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            A visual overview of AI-assisted stress screening activity.
          </p>
        </div>

        {/* Demo Baseline Transparency Banner */}
        <div className="mb-10 p-4 bg-card border border-border flex items-center justify-between text-xs font-archivo">
          <span className="text-muted-foreground">
            * Aggregating current session assessments and sample benchmark records. Demo records are clearly tagged.
          </span>
          <button
            onClick={onStartAssessment}
            className="text-primary hover:underline font-bold uppercase tracking-wider shrink-0 ml-4"
          >
            + Run Live Screening
          </button>
        </div>

        {/* Oversized Statistics Cards (Asymmetrical Editorial Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* TOTAL ASSESSMENTS */}
          <div className="bg-card border-2 border-border p-8 flex flex-col justify-between min-h-[240px] relative">
            <div>
              <span className="text-xs font-archivo font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                TOTAL ASSESSMENTS
              </span>
              <div className="font-archivo font-black text-6xl text-foreground">
                {total}
              </div>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>ACTIVE DATABASE</span>
              <Activity className="w-4 h-4 text-primary" />
            </div>
          </div>

          {/* GROWING STRESS — NO */}
          <div className="bg-card border border-border p-8 flex flex-col justify-between min-h-[240px]">
            <div>
              <span className="text-xs font-archivo font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                ROUTINE WELFARE (NO)
              </span>
              <div className="font-archivo font-black text-6xl text-primary">
                {countNo}
              </div>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>{pctNo}% OF TOTAL</span>
              <span className="text-primary font-bold">ROUTINE</span>
            </div>
          </div>

          {/* GROWING STRESS — MAYBE */}
          <div className="bg-card border border-border p-8 flex flex-col justify-between min-h-[240px]">
            <div>
              <span className="text-xs font-archivo font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                ELEVATED ATTENTION (MAYBE)
              </span>
              <div className="font-archivo font-black text-6xl text-foreground">
                {countMaybe}
              </div>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>{pctMaybe}% OF TOTAL</span>
              <span className="text-muted-foreground font-bold">MONITORING</span>
            </div>
          </div>

          {/* GROWING STRESS — YES */}
          <div className="bg-card border border-border p-8 flex flex-col justify-between min-h-[240px]">
            <div>
              <span className="text-xs font-archivo font-bold text-muted-foreground uppercase tracking-widest block mb-4">
                ACTIONABLE FOLLOW-UP (YES)
              </span>
              <div className="font-archivo font-black text-6xl text-primary">
                {countYes}
              </div>
            </div>
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>{pctYes}% OF TOTAL</span>
              <span className="text-primary font-bold">ACTION RECOMMENDED</span>
            </div>
          </div>
        </div>

        {/* Prediction Distribution & Signal Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Prediction Distribution Visual Panel */}
          <div className="lg:col-span-7 bg-card border border-border p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <h3 className="h3-display text-xl text-foreground">PREDICTION DISTRIBUTION</h3>
                <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest">
                  RATIO BREAKDOWN
                </span>
              </div>

              {/* Proportional Segmented Bar */}
              <div className="w-full h-8 bg-background border border-border flex overflow-hidden mb-6">
                <div 
                  style={{ width: `${pctNo}%` }} 
                  className="bg-primary hover:opacity-90 transition-all flex items-center justify-center text-charcoal-950 font-bold text-xs"
                  title={`No: ${pctNo}%`}
                >
                  {pctNo > 10 && `NO ${pctNo}%`}
                </div>
                <div 
                  style={{ width: `${pctMaybe}%` }} 
                  className="bg-muted-foreground/40 hover:opacity-90 transition-all flex items-center justify-center text-foreground font-bold text-xs"
                  title={`Maybe: ${pctMaybe}%`}
                >
                  {pctMaybe > 10 && `MAYBE ${pctMaybe}%`}
                </div>
                <div 
                  style={{ width: `${pctYes}%` }} 
                  className="bg-charcoal-700 border-l border-primary hover:opacity-90 transition-all flex items-center justify-center text-primary font-bold text-xs"
                  title={`Yes: ${pctYes}%`}
                >
                  {pctYes > 10 && `YES ${pctYes}%`}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs font-archivo pt-4">
                <div className="border-l-2 border-primary pl-3">
                  <span className="text-muted-foreground block text-[11px] uppercase">ROUTINE (NO)</span>
                  <strong className="text-base text-foreground font-black">{countNo}</strong>
                  <span className="text-muted-foreground ml-1">({pctNo}%)</span>
                </div>
                <div className="border-l-2 border-muted-foreground pl-3">
                  <span className="text-muted-foreground block text-[11px] uppercase">MIXED (MAYBE)</span>
                  <strong className="text-base text-foreground font-black">{countMaybe}</strong>
                  <span className="text-muted-foreground ml-1">({pctMaybe}%)</span>
                </div>
                <div className="border-l-2 border-charcoal-700 pl-3">
                  <span className="text-muted-foreground block text-[11px] uppercase">ACTIONABLE (YES)</span>
                  <strong className="text-base text-foreground font-black">{countYes}</strong>
                  <span className="text-muted-foreground ml-1">({pctYes}%)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>MODEL: RANDOM FOREST CLASSIFIER</span>
              <span className="text-primary font-bold">13 INPUT FEATURES</span>
            </div>
          </div>

          {/* Recent Screenings Preview Panel */}
          <div className="lg:col-span-5 bg-card border border-border p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <h3 className="h3-display text-xl text-foreground">RECENT SCREENINGS</h3>
                <button
                  onClick={onViewHistory}
                  className="text-xs font-archivo font-bold text-primary hover:underline uppercase tracking-wider flex items-center gap-1"
                >
                  <span>All</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {records.slice(0, 4).map((rec) => (
                  <div
                    key={rec.assessment_id}
                    className="p-3 bg-background border border-border flex items-center justify-between text-xs font-archivo"
                  >
                    <div>
                      <div className="font-bold text-foreground">{rec.personnel_id}</div>
                      <div className="text-[11px] text-muted-foreground">{rec.date}</div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-0.5 font-bold uppercase ${
                        rec.prediction === "Yes"
                          ? "bg-primary/20 text-primary border border-primary/40"
                          : rec.prediction === "Maybe"
                          ? "bg-card text-muted-foreground border border-border"
                          : "bg-background text-foreground border border-border"
                      }`}>
                        {rec.prediction}
                      </span>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {rec.confidence.toFixed(1)}% Conf
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onViewHistory}
              className="mt-6 w-full py-3 bg-background hover:bg-card border border-border hover:border-primary text-xs font-archivo font-bold uppercase tracking-wider text-center transition-colors"
            >
              EXPLORE AUDIT TIMELINE
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
