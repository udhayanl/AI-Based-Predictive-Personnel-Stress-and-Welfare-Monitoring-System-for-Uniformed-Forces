import React, { useState } from "react";
import { Activity, Menu, X } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  backendOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  backendOnline,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const navLinks = [
    { id: "home", label: "Overview" },
    { id: "assessment", label: "Assessment" },
    { id: "insights", label: "Insights" },
    { id: "history", label: "History" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-[78px] bg-background/90 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-[1280px] h-full mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Left Branding */}
        <div 
          onClick={() => { onNavigate("home"); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-sm bg-card border border-border group-hover:border-primary flex items-center justify-center text-primary transition-all">
            <Activity className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-archivo font-black text-xl tracking-tight leading-none text-foreground flex items-center gap-1.5">
              MWI
              <span className="hidden sm:inline-block text-xs font-bold text-primary tracking-widest uppercase">
                · SYSTEM
              </span>
            </span>
            <span className="hidden sm:block text-[11px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
              MISSION WELLBEING
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`font-archivo text-sm font-bold uppercase tracking-wide transition-all relative py-2 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary animate-in fade-in duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Status */}
        <div className="flex items-center gap-3">
          {/* Backend Status Pill (Read-Only) */}
          <div
            title={backendOnline ? "FastAPI ML Pipeline Connected" : "Backend Offline"}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-card border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground select-none"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                backendOnline ? "bg-primary animate-pulse" : "bg-red-500"
              }`}
            />
            <span>{backendOnline ? "ML Pipeline Online" : "Server Offline"}</span>
          </div>


          {/* Desktop CTA */}
          <button
            onClick={() => { onNavigate("assessment"); setMobileMenuOpen(false); }}
            className="hidden sm:inline-flex items-center justify-center px-6 py-3 rounded-none bg-primary hover:bg-lime-bright text-primary-foreground font-archivo font-black text-sm tracking-wider uppercase transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_16px_rgba(163,243,44,0.25)]"
          >
            START ASSESSMENT
          </button>

          {/* Compact Mobile CTA */}
          <button
            onClick={() => { onNavigate("assessment"); setMobileMenuOpen(false); }}
            className="sm:hidden px-3.5 py-2 bg-primary text-primary-foreground font-archivo font-black text-xs uppercase tracking-wider"
          >
            START
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[78px] left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left font-archivo text-lg font-black uppercase tracking-wide py-2 ${
                currentTab === link.id ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <span className={`w-2 h-2 rounded-full ${backendOnline ? "bg-primary" : "bg-red-500"}`} />
              <span>{backendOnline ? "ML Pipeline Online" : "Server Offline"}</span>
            </div>
          </div>

        </div>
      )}
    </header>
  );
};
