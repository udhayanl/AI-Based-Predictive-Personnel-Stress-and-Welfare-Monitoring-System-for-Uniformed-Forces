import React from "react";
import { ArrowRight } from "lucide-react";

interface FinalCtaProps {
  onStartAssessment: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onStartAssessment }) => {
  return (
    <section className="w-full py-24 bg-primary text-primary-foreground relative overflow-hidden select-none">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-archivo text-xs font-black uppercase tracking-widest text-charcoal-900 block mb-3">
            [ NEXT STEP ]
          </span>
          <h2 className="font-archivo font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none text-charcoal-950">
            READY TO CHECK<br />THE SIGNALS?
          </h2>
          <p className="mt-4 text-charcoal-900 font-archivo font-semibold text-base md:text-lg max-w-xl">
            Complete an AI-assisted assessment and explore the resulting welfare insight.
          </p>
        </div>

        <button
          onClick={onStartAssessment}
          className="px-10 py-5 bg-charcoal-950 hover:bg-black text-primary font-archivo font-black text-base uppercase tracking-wider transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-2xl flex items-center gap-3 shrink-0"
        >
          <span>START ASSESSMENT</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
