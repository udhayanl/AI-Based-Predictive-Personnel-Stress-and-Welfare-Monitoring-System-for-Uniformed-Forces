import React from "react";
import { Cpu, Database, CheckCircle2, AlertOctagon } from "lucide-react";

export const AboutPage: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary block mb-3">
            [ RESEARCH METHODOLOGY & GOVERNANCE ]
          </span>
          <h1 className="h1-display text-foreground max-w-3xl mb-4">
            BUILT FOR<br />
            EARLIER SUPPORT.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
            The AI-Based Predictive Personnel Stress and Welfare Monitoring System explores how machine-learning techniques can assist with identifying patterns associated with Growing Stress and encourage earlier welfare support.
          </p>
        </div>

        {/* PROJECT SECTION */}
        <div className="bg-card border border-border p-8 md:p-12 mb-12">
          <span className="text-xs font-archivo font-bold uppercase tracking-widest text-primary block mb-2">
            01 · PROJECT PURPOSE
          </span>
          <h2 className="h2-display text-2xl md:text-4xl text-foreground mb-4">
            PROACTIVE WELLBEING INTELLIGENCE
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-4">
            Uniformed personnel frequently operate in demanding, isolated, and rapidly changing circumstances. Early identification of accumulating stress is vital to maintaining operational readiness and preventing acute strain.
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            This system serves as an early-warning, decision-support instrument to help welfare officers and leadership allocate supportive resources before stress develops into critical operational or personal distress.
          </p>
        </div>

        {/* MODEL SECTION */}
        <div className="bg-card border border-border p-8 md:p-12 mb-12">
          <div className="flex items-center justify-between pb-6 border-b border-border mb-8">
            <div>
              <span className="text-xs font-archivo font-bold uppercase tracking-widest text-primary block mb-1">
                02 · MACHINE LEARNING
              </span>
              <h3 className="h3-display text-2xl md:text-3xl text-foreground">
                ALGORITHM EVALUATION
              </h3>
            </div>
            <Cpu className="w-6 h-6 text-primary" />
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
            During the research phase, multiple machine-learning architectures were evaluated against categorical wellbeing indicators:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-background border border-border">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">
                BENCHMARK 01
              </span>
              <h4 className="font-archivo font-black text-lg text-foreground uppercase mb-2">
                LOGISTIC REGRESSION
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Linear probability separation baseline. Effective for generalized trend identification but limited across non-linear feature interactions.
              </p>
            </div>

            <div className="p-6 bg-background border border-border">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">
                BENCHMARK 02
              </span>
              <h4 className="font-archivo font-black text-lg text-foreground uppercase mb-2">
                DECISION TREE
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Interpretable rule-based partitions across categorical indicators. Sensitive to variance and prone to overfitting on smaller segments.
              </p>
            </div>

            <div className="p-6 bg-background border-2 border-primary relative shadow-lg">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                FINAL DEPLOYED MODEL
              </span>
              <h4 className="font-archivo font-black text-lg text-foreground uppercase mb-2">
                RANDOM FOREST CLASSIFIER
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ensemble of bagged decision trees providing superior variance reduction, high categorical handling, and robust probability calibration across No, Maybe, and Yes classes.
              </p>
            </div>
          </div>
        </div>

        {/* DATASET SECTION */}
        <div className="bg-card border border-border p-8 md:p-12 mb-12">
          <div className="flex items-center justify-between pb-6 border-b border-border mb-8">
            <div>
              <span className="text-xs font-archivo font-bold uppercase tracking-widest text-primary block mb-1">
                03 · TRAINING DATA ORIGIN
              </span>
              <h3 className="h3-display text-2xl md:text-3xl text-foreground">
                DATASET PROXY DISCLOSURE
              </h3>
            </div>
            <Database className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-4 max-w-3xl text-muted-foreground leading-relaxed">
            <p>
              This project utilizes an open, publicly available workplace mental health and wellbeing dataset as a research proxy because suitable, public uniformed-force operational welfare datasets are strictly confidential and inaccessible for undergraduate academic research.
            </p>
            <p>
              <strong>Responsible Statement:</strong> The model was NOT trained on real military or active-duty combat personnel. We do not imply that this dataset represents all uniformed forces, and results should be understood strictly within the context of an academic exploratory prototype.
            </p>
          </div>
        </div>

        {/* RESPONSIBLE AI SECTION */}
        <div className="bg-card border border-border p-8 md:p-12 mb-12">
          <div className="pb-6 border-b border-border mb-8">
            <span className="text-xs font-archivo font-bold uppercase tracking-widest text-primary block mb-1">
              04 · RESPONSIBLE AI PRINCIPLES
            </span>
            <h3 className="h3-display text-2xl md:text-3xl text-foreground">
              A MODEL IS NOT A PERSON.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-background border border-border">
              <span className="text-2xl font-black text-primary font-archivo block mb-3">01</span>
              <h4 className="font-black text-sm uppercase text-foreground mb-2">NO DIAGNOSIS</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                The system does not diagnose mental-health conditions or replace clinical evaluation.
              </p>
            </div>

            <div className="p-6 bg-background border border-border">
              <span className="text-2xl font-black text-primary font-archivo block mb-3">02</span>
              <h4 className="font-black text-sm uppercase text-foreground mb-2">HUMAN REVIEW</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                AI output should be interpreted alongside appropriate human judgement and unit context.
              </p>
            </div>

            <div className="p-6 bg-background border border-border">
              <span className="text-2xl font-black text-primary font-archivo block mb-3">03</span>
              <h4 className="font-black text-sm uppercase text-foreground mb-2">PRIVACY FIRST</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Only non-identifying, structured indicators necessary for prediction are processed.
              </p>
            </div>

            <div className="p-6 bg-background border border-border">
              <span className="text-2xl font-black text-primary font-archivo block mb-3">04</span>
              <h4 className="font-black text-sm uppercase text-foreground mb-2">NON-PUNITIVE</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Predictions must not independently determine deployment, discipline, promotion, or punishment.
              </p>
            </div>
          </div>
        </div>

        {/* LIMITATIONS: "THE SIGNAL HAS LIMITS." */}
        <div className="p-8 md:p-14 bg-charcoal-950 border-2 border-primary text-center">
          <AlertOctagon className="w-8 h-8 text-primary mx-auto mb-4" />
          <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest block mb-2">
            05 · BOUNDARIES OF PREDICTIVE SCREENING
          </span>
          <h2 className="font-archivo font-black text-3xl sm:text-5xl uppercase tracking-tighter text-foreground mb-4">
            THE SIGNAL HAS LIMITS.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            The training data does not represent every uniformed-force environment or every individual's experience. Predictions may be affected by dataset limitations, missing context, and differences between the training population and real-world users.
          </p>
          <div className="font-archivo font-black text-2xl sm:text-4xl uppercase tracking-tight text-primary">
            USE THE SIGNAL. KEEP THE HUMAN.
          </div>
        </div>

      </div>
    </section>
  );
};
