import React from "react";
import { Activity } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-charcoal-950 border-t border-border pt-16 pb-12 text-sm font-archivo">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border">
          
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-sm bg-card border border-border flex items-center justify-center text-primary">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-archivo font-black text-xl tracking-tight text-foreground">
                MISSION WELLBEING
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              AI-assisted personnel welfare intelligence. Exploring machine-learning decision support to detect early stress signals and sustain human readiness.
            </p>
            <span className="inline-block px-3 py-1 bg-card border border-border text-[11px] font-bold text-primary uppercase tracking-widest">
              ACADEMIC RESEARCH PROTOTYPE
            </span>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-muted-foreground text-sm">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-primary transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("assessment")} className="hover:text-primary transition-colors">
                  Assessment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("insights")} className="hover:text-primary transition-colors">
                  Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("history")} className="hover:text-primary transition-colors">
                  History
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("about")} className="hover:text-primary transition-colors">
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Project Research Details */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
              RESEARCH ARCHITECTURE
            </h4>
            <ul className="space-y-2.5 text-muted-foreground text-sm">
              <li>Machine Learning (Random Forest Pipeline)</li>
              <li>Responsible AI & Non-Punitive Mandate</li>
              <li>Categorical Signal Preprocessing</li>
              <li>Academic Decision-Support Methodology</li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted-foreground">
          <span className="uppercase tracking-wide font-bold">
            AI-BASED PREDICTIVE PERSONNEL STRESS AND WELFARE MONITORING SYSTEM
          </span>
          <span>© 2026 Mission Wellbeing · All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};
