import React from "react";
import { motion } from "framer-motion";
import { Cpu, HeartPulse } from "lucide-react";

export const SignatureSignalField: React.FC = () => {
  return (
    <section className="w-full py-20 border-b border-border bg-charcoal-950 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Label */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-primary" />
            <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary">
              SIGNATURE ARCHITECTURE · AI SIGNAL FIELD
            </span>
          </div>
          <span className="text-xs font-archivo text-muted-foreground uppercase tracking-widest hidden sm:inline-block">
            CONTINUOUS FEATURE PROJECTION
          </span>
        </div>

        {/* Large Visual Card with Hard Diagonal Split */}
        <div className="relative w-full h-[360px] md:h-[480px] bg-card border-2 border-border overflow-hidden shadow-2xl">
          
          {/* Subtle Background Grid & Waveforms */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* LEFT ZONE: "HUMAN SIGNALS" */}
          <div 
            className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between clip-diagonal bg-card z-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border text-[11px] font-archivo font-bold uppercase tracking-widest text-muted-foreground mb-4">
                <HeartPulse className="w-3.5 h-3.5 text-primary" />
                OBSERVED EXPERIENCE
              </div>
              <h3 className="font-archivo font-black text-3xl md:text-5xl uppercase tracking-tighter text-foreground leading-tight max-w-sm">
                HUMAN SIGNALS
              </h3>
            </div>

            <div className="space-y-3 max-w-xs text-xs md:text-sm font-archivo text-muted-foreground">
              <div className="flex items-center gap-2 border-l-2 border-border pl-3">
                <span>01. Confinement & Daily Routines</span>
              </div>
              <div className="flex items-center gap-2 border-l-2 border-border pl-3">
                <span>02. Emotional & Mood Fluctuations</span>
              </div>
              <div className="flex items-center gap-2 border-l-2 border-border pl-3">
                <span>03. Duty Engagement & Unit Cohesion</span>
              </div>
            </div>
          </div>

          {/* RIGHT ZONE: "AI INSIGHT" */}
          <div 
            className="absolute inset-0 p-8 md:p-14 flex flex-col justify-between items-end text-right clip-diagonal-invert bg-charcoal-900 z-10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-primary/40 text-[11px] font-archivo font-bold uppercase tracking-widest text-primary mb-4">
                <Cpu className="w-3.5 h-3.5" />
                PROBABILISTIC CLUSTERING
              </div>
              <h3 className="font-archivo font-black text-3xl md:text-5xl uppercase tracking-tighter text-primary leading-tight">
                AI INSIGHT
              </h3>
            </div>

            <div className="space-y-3 max-w-xs text-xs md:text-sm font-archivo text-muted-foreground">
              <div className="flex items-center justify-end gap-2 border-r-2 border-primary pr-3">
                <span>Non-Linear Decision Boundaries</span>
              </div>
              <div className="flex items-center justify-end gap-2 border-r-2 border-primary pr-3">
                <span>Three-Tier Growing Stress Output</span>
              </div>
              <div className="flex items-center justify-end gap-2 border-r-2 border-primary pr-3">
                <span>Calibrated Class Confidence</span>
              </div>
            </div>
          </div>

          {/* Hard Diagonal Divider Line Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <line 
              x1="62%" y1="0%" 
              x2="38%" y2="100%" 
              stroke="#a3f32c" 
              strokeWidth="3" 
            />
            {/* Center Pulsing Indicator on Split */}
            <circle cx="50%" cy="50%" r="5" fill="#a3f32c" className="animate-ping" />
            <circle cx="50%" cy="50%" r="4" fill="#a3f32c" />
          </svg>

          {/* Moving Signal Waves */}
          <motion.div
            animate={{
              x: ["-10%", "10%", "-10%"],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30"
          >
            <div className="w-[600px] h-[300px] border border-primary/20 rounded-full blur-[1px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
