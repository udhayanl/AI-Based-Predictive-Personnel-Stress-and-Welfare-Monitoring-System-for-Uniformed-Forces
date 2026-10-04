import React, { useEffect, useState } from "react";
import { Activity, CheckCircle2 } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
}

export const ProcessingModal: React.FC<ProcessingModalProps> = ({ isOpen }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "INPUT VALIDATION", label: "Preparing assessment..." },
    { title: "FEATURE PROCESSING", label: "Processing model inputs..." },
    { title: "MODEL INFERENCE", label: "Generating prediction..." },
    { title: "WELFARE INSIGHT", label: "Formatting supportive guidance..." },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-card border-2 border-primary p-8 md:p-12 relative shadow-[0_0_50px_rgba(163,243,44,0.15)] text-center">
        
        {/* Animated Radar / Pulsing Indicator */}
        <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" />
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <span className="text-xs font-archivo font-bold text-primary uppercase tracking-widest block mb-2">
          INFERENCE ENGINE RUNNING
        </span>
        <h3 className="font-archivo font-black text-2xl md:text-3xl uppercase tracking-tight text-foreground mb-4">
          ANALYZING WELLBEING SIGNALS
        </h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8">
          Transmitting assessment payload to FastAPI scikit-learn Random Forest pipeline...
        </p>

        {/* Stepper Display */}
        <div className="space-y-3 max-w-xs mx-auto text-left">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={step.title}
                className={`p-3 border transition-all ${
                  isCurrent
                    ? "border-primary bg-primary/5 text-foreground"
                    : isCompleted
                    ? "border-border bg-background/50 text-muted-foreground"
                    : "border-transparent text-muted-foreground/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    ) : (
                      <span className={`w-4 h-4 rounded-full border text-[10px] flex items-center justify-center shrink-0 ${isCurrent ? "border-primary text-primary" : "border-muted-foreground/40"}`}>
                        {idx + 1}
                      </span>
                    )}
                    <span className="font-archivo font-bold text-xs uppercase tracking-wider">
                      {step.title}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-archivo font-bold text-primary animate-pulse uppercase">
                      Active
                    </span>
                  )}
                </div>
                {isCurrent && (
                  <p className="text-[11px] text-muted-foreground mt-1 pl-6">
                    {step.label}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
