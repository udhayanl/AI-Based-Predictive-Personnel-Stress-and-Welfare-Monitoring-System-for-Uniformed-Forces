import React, { useState, useEffect } from "react";
import type { AssessmentInputs, PredictionResult, AssessmentRecord } from "./types";
import {

  checkBackendHealth,
  predictStressApi,
  getLocalAssessments,
} from "./services/api";

import { TopInfoBar } from "./components/TopInfoBar";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { SignatureSignalField } from "./components/SignatureSignalField";
import { HowItWorks } from "./components/HowItWorks";
import { ModelPipeline } from "./components/ModelPipeline";
import { ResponsibleAISection } from "./components/ResponsibleAISection";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { AssessmentPage } from "./components/AssessmentPage";
import { ResultPage } from "./components/ResultPage";
import { InsightsDashboard } from "./components/InsightsDashboard";
import { AssessmentHistory } from "./components/AssessmentHistory";
import { AboutPage } from "./components/AboutPage";
import { ProcessingModal } from "./components/ProcessingModal";
import { MobileBottomCta } from "./components/MobileBottomCta";

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<PredictionResult | null>(null);
  const [records, setRecords] = useState<AssessmentRecord[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);


  // Initial Data and Health Check
  const refreshStatus = async () => {
    const health = await checkBackendHealth();
    setBackendOnline(health.status === "healthy" && health.model_loaded);
    setRecords(getLocalAssessments(true));
  };

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 15000);

    // Sync with hash
    const hash = window.location.hash.replace("#", "");
    if (hash && ["home", "assessment", "result", "insights", "history", "about"].includes(hash)) {
      setCurrentTab(hash);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash && ["home", "assessment", "result", "insights", "history", "about"].includes(newHash)) {
        setCurrentTab(newHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigateTo = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Form Submission Handler
  const handleAssessmentSubmit = async (inputs: AssessmentInputs) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const result = await predictStressApi(inputs);
      setLastResult(result);
      setRecords(getLocalAssessments(true));
      
      // Artificial delay for smooth UX transition matching processing overlay
      setTimeout(() => {
        setIsSubmitting(false);
        navigateTo("result");
      }, 1500);

    } catch (err: any) {
      setIsSubmitting(false);
      setApiError(err.message || "Prediction could not be completed. Please verify the submitted information and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-archivo relative">
      {/* 40px Lime Top Information Bar */}
      <TopInfoBar />

      {/* Sticky 78px Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={navigateTo}
        backendOnline={backendOnline}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentTab === "home" && (
          <>
            <HeroSection
              onStartAssessment={() => navigateTo("assessment")}
              onExploreHowItWorks={() => {
                const el = document.getElementById("how-it-works");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <SignatureSignalField />
            <HowItWorks />
            <ModelPipeline />
            <ResponsibleAISection />
            <FinalCta onStartAssessment={() => navigateTo("assessment")} />
          </>
        )}

        {currentTab === "assessment" && (
          <AssessmentPage
            onSubmit={handleAssessmentSubmit}
            isSubmitting={isSubmitting}
            error={apiError}
            onClearError={() => setApiError(null)}
          />
        )}

        {currentTab === "result" && (
          <ResultPage
            result={lastResult}
            onNewAssessment={() => navigateTo("assessment")}
            onViewInsights={() => navigateTo("insights")}
          />
        )}

        {currentTab === "insights" && (
          <InsightsDashboard
            records={records}
            onStartAssessment={() => navigateTo("assessment")}
            onViewHistory={() => navigateTo("history")}
          />
        )}

        {currentTab === "history" && (
          <AssessmentHistory
            records={records}
            onStartAssessment={() => navigateTo("assessment")}
          />
        )}

        {currentTab === "about" && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Sticky Mobile Bottom CTA */}
      <MobileBottomCta
        currentTab={currentTab}
        onStartAssessment={() => navigateTo("assessment")}
      />

      {/* AI Inference Processing Modal Overlay */}
      <ProcessingModal isOpen={isSubmitting} />
    </div>
  );
};

export default App;
