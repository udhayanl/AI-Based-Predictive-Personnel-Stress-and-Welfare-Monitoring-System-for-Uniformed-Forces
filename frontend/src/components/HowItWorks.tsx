import React from "react";
import { SectionHeading } from "./SectionHeading";
import { ClipboardList, Cpu, Target, HeartHandshake } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "ASSESS",
      desc: "Collect structured wellbeing and work-context information.",
      icon: ClipboardList,
    },
    {
      num: "02",
      title: "ANALYZE",
      desc: "Prepare the information using the trained machine-learning pipeline.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "PREDICT",
      desc: "Estimate the most likely Growing Stress category.",
      icon: Target,
    },
    {
      num: "04",
      title: "SUPPORT",
      desc: "Present the result alongside responsible welfare-oriented guidance.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-24 border-b border-border bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading
          tag="WORKFLOW ARCHITECTURE"
          title="FROM SIGNALS TO SUPPORT."
          subtitle="The system analyzes selected wellbeing and work-related indicators to estimate patterns associated with Growing Stress."
        />

        {/* Four Large Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-card border border-border p-8 relative flex flex-col justify-between min-h-[320px] group hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Huge Lime Numeral */}
                <div>
                  <div className="font-archivo font-black text-6xl text-primary mb-6 leading-none">
                    {step.num}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <h3 className="font-archivo font-black text-xl text-foreground uppercase tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom subtle accent line */}
                <div className="w-8 h-[2px] bg-border group-hover:bg-primary group-hover:w-full transition-all duration-300 mt-6" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
