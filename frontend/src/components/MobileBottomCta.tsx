import React from "react";
import { ArrowRight } from "lucide-react";

interface MobileBottomCtaProps {
  currentTab: string;
  onStartAssessment: () => void;
}

export const MobileBottomCta: React.FC<MobileBottomCtaProps> = ({
  currentTab,
  onStartAssessment,
}) => {
  if (currentTab === "assessment") return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-background/95 backdrop-blur-md border-t border-border">
      <button
        onClick={onStartAssessment}
        className="w-full py-3.5 bg-primary text-primary-foreground font-archivo font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
      >
        <span>START ASSESSMENT</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
