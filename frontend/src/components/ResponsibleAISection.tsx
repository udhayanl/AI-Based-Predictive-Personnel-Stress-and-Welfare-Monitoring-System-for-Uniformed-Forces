import React from "react";
import { SectionHeading } from "./SectionHeading";
import { ShieldAlert, Users, EyeOff, Scale } from "lucide-react";

export const ResponsibleAISection: React.FC = () => {
  const cards = [
    {
      num: "01",
      title: "NO DIAGNOSIS",
      desc: "The system does not diagnose mental-health conditions.",
      icon: ShieldAlert,
    },
    {
      num: "02",
      title: "HUMAN REVIEW",
      desc: "AI output should be interpreted alongside appropriate human judgement.",
      icon: Users,
    },
    {
      num: "03",
      title: "PRIVACY FIRST",
      desc: "Only information required for the assessment should be collected.",
      icon: EyeOff,
    },
    {
      num: "04",
      title: "NO AUTOMATED DECISIONS",
      desc: "Predictions should not independently determine employment, deployment, discipline, promotion, or punishment.",
      icon: Scale,
    },
  ];

  return (
    <section className="w-full py-24 border-b border-border bg-background">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <SectionHeading
          tag="ETHICAL COMMITMENT"
          title="A MODEL IS NOT A PERSON."
          subtitle="Engineered with strict governance guidelines to ensure predictive technology serves to support, never to penalize."
        />

        {/* Four Large Governance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="bg-card border border-border p-8 flex flex-col justify-between min-h-[280px] relative group hover:border-primary transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-archivo font-black text-3xl text-primary">
                      {card.num}
                    </span>
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-archivo font-black text-lg text-foreground uppercase tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="w-6 h-[2px] bg-primary mt-6" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
