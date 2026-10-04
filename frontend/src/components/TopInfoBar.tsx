import React from "react";

export const TopInfoBar: React.FC = () => {
  return (
    <div className="h-10 bg-primary text-charcoal-950 font-archivo font-black text-xs md:text-sm tracking-wider uppercase flex items-center justify-center px-4 text-center select-none z-50 relative">
      <span className="truncate">
        AI-ASSISTED WELFARE SCREENING · HUMAN REVIEW ALWAYS MATTERS
      </span>
    </div>
  );
};
