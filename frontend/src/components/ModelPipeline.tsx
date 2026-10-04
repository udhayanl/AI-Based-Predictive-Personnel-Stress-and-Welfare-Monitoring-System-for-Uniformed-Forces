import React from "react";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight, ArrowDown, UserCheck, Binary, Cpu, Compass, HeartHandshake } from "lucide-react";

export const ModelPipeline: React.FC = () => {
  const stages = [
    { title: "USER INPUT", desc: "13 Personnel Welfare Indicators", icon: UserCheck },
    { title: "DATA PREPROCESSING", desc: "OneHotEncoder & Imputation", icon: Binary },
    { title: "ML MODEL", desc: "Random Forest Classifier", icon: Cpu },
    { title: "PREDICTION", desc: "No · Maybe · Yes", icon: Compass },
    { title: "WELFARE GUIDANCE", desc: "Human Support Pathway", icon: HeartHandshake },
  ];

  return (
    <section className="w-full py-24 border-b border-border bg-charcoal-950">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading
          tag="INTELLIGENCE PIPELINE"
          title="INFERENCE SEQUENCE."
          subtitle="A deterministic, transparent machine-learning pipeline processing categorical signals into calibrated probability estimations."
        />

        {/* Desktop Horizontal / Mobile Vertical Pipeline */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isLast = idx === stages.length - 1;

            return (
              <React.Fragment key={stage.title}>
                {/* Stage Node */}
                <div className="w-full lg:w-1/5 bg-card border border-border p-6 flex flex-col items-center text-center group hover:border-primary transition-all duration-300 relative z-10 shadow-lg">
                  <div className="w-12 h-12 bg-background border border-border group-hover:border-primary flex items-center justify-center text-primary mb-4 transition-colors">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-[10px] font-archivo font-bold uppercase tracking-widest text-primary mb-1">
                    STAGE 0{idx + 1}
                  </span>
                  <h4 className="font-archivo font-black text-sm md:text-base text-foreground uppercase tracking-tight mb-2">
                    {stage.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                {/* Animated Connector Arrow (Desktop Horizontal, Mobile Vertical) */}
                {!isLast && (
                  <>
                    <div className="hidden lg:flex items-center justify-center text-primary animate-pulse">
                      <ArrowRight className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="lg:hidden flex items-center justify-center text-primary py-2 animate-pulse">
                      <ArrowDown className="w-6 h-6 stroke-[3]" />
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
