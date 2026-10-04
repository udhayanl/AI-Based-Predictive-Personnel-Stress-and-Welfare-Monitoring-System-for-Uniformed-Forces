import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, ShieldCheck, Cpu, Waves } from "lucide-react";

interface HeroSectionProps {
  onStartAssessment: () => void;
  onExploreHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAssessment,
  onExploreHowItWorks,
}) => {
  const headingLines = ["UNDERSTAND", "STRESS.", "SUPPORT", "PEOPLE."];

  return (
    <section className="relative w-full pt-12 pb-24 md:py-24 border-b border-border overflow-hidden">
      {/* Background Subtle Waveform Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#a3f32c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-border text-primary font-archivo text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI-ASSISTED PERSONNEL WELFARE INTELLIGENCE
            </motion.div>

            {/* Large H1 Staggered Line by Line */}
            <h1 className="h1-display text-foreground mb-6 flex flex-col">
              {headingLines.map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <motion.span
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.09,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`block ${index === 1 ? "text-primary" : "text-foreground"}`}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-8"
            >
              An AI-assisted screening system designed to identify patterns associated with growing stress and support earlier welfare intervention.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={onStartAssessment}
                className="px-8 py-4 bg-primary hover:bg-lime-bright text-primary-foreground font-archivo font-black text-base uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_24px_rgba(163,243,44,0.3)] flex items-center gap-2 group"
              >
                <span>START ASSESSMENT</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onExploreHowItWorks}
                className="px-8 py-4 bg-transparent hover:bg-card border border-border hover:border-primary text-foreground hover:text-primary font-archivo font-black text-base uppercase tracking-wider transition-all"
              >
                HOW IT WORKS
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="pt-8 border-t border-border w-full flex flex-wrap items-center gap-y-4 gap-x-8 text-xs font-archivo font-bold text-muted-foreground tracking-widest uppercase"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>AI-ASSISTED SCREENING</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span>PREDICTIVE ANALYTICS</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span>WELFARE FOCUSED</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Large Abstract AI Signal Field */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg bg-card border border-border p-6 md:p-8 relative overflow-hidden group shadow-2xl"
            >
              {/* Card Label Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="font-archivo text-xs font-bold uppercase tracking-widest text-primary">
                    AI WELFARE SIGNAL
                  </span>
                </div>
                <span className="text-[11px] font-archivo font-bold uppercase tracking-widest text-muted-foreground bg-background px-2.5 py-1 border border-border">
                  MODEL OUTPUT
                </span>
              </div>

              {/* Central Abstract Signal Graphic */}
              <div className="relative py-12 flex flex-col items-center justify-center min-h-[300px]">
                {/* Abstract Signal Waveforms & Lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                    {/* Background Grid */}
                    <line x1="0" y1="75" x2="400" y2="75" stroke="hsl(160, 10%, 22%)" strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="hsl(160, 10%, 25%)" />
                    <line x1="0" y1="225" x2="400" y2="225" stroke="hsl(160, 10%, 22%)" strokeDasharray="4 4" />
                    <line x1="100" y1="0" x2="100" y2="300" stroke="hsl(160, 10%, 20%)" strokeDasharray="4 4" />
                    <line x1="200" y1="0" x2="200" y2="300" stroke="hsl(160, 10%, 20%)" strokeDasharray="4 4" />
                    <line x1="300" y1="0" x2="300" y2="300" stroke="hsl(160, 10%, 20%)" strokeDasharray="4 4" />
                    
                    {/* Signal Curves */}
                    <path
                      d="M 10 150 Q 80 80, 150 150 T 290 150 T 390 150"
                      stroke="hsl(150, 6%, 40%)"
                      strokeWidth="2"
                    />
                    <path
                      d="M 10 150 Q 100 220, 200 120 T 390 150"
                      stroke="hsl(84, 82%, 56%)"
                      strokeWidth="2.5"
                      strokeDasharray="8 4"
                    />
                  </svg>
                </div>

                {/* Prominent Target Label */}
                <div className="relative z-10 text-center">
                  <span className="text-[11px] font-archivo font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                    EVALUATION TARGET
                  </span>
                  <div className="font-archivo font-black text-3xl md:text-4xl uppercase tracking-tight text-foreground border-y-2 border-primary py-3 px-6 bg-background/80 backdrop-blur-sm">
                    GROWING STRESS
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="px-2.5 py-1 text-xs font-archivo font-bold text-primary bg-primary/10 border border-primary/30 uppercase">
                      NO
                    </span>
                    <span className="px-2.5 py-1 text-xs font-archivo font-bold text-primary bg-primary/10 border border-primary/30 uppercase">
                      MAYBE
                    </span>
                    <span className="px-2.5 py-1 text-xs font-archivo font-bold text-primary bg-primary/10 border border-primary/30 uppercase">
                      YES
                    </span>
                  </div>
                </div>

                {/* Subtle Moving Signal Points */}
                <div className="absolute top-8 left-12 flex items-center gap-2 text-[10px] font-archivo font-bold tracking-widest text-muted-foreground uppercase">
                  <Waves className="w-3.5 h-3.5 text-primary" />
                  <span>13 SIGNALS</span>
                </div>
                <div className="absolute bottom-8 right-12 flex items-center gap-2 text-[10px] font-archivo font-bold tracking-widest text-primary uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>CALIBRATED PROBABILITIES</span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-archivo text-muted-foreground">
                <span className="uppercase tracking-wider font-bold">DECISION SUPPORT ONLY</span>
                <span className="text-primary font-bold tracking-wider">AI-ASSISTED</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
