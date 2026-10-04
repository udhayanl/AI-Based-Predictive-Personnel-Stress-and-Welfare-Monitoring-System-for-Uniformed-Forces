import React, { useState } from "react";
import { X, Check, RotateCcw } from "lucide-react";
import { getApiBaseUrl, setApiBaseUrl, resetApiBaseUrl } from "../services/api";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshHealth: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onRefreshHealth,
}) => {
  const [url, setUrl] = useState(getApiBaseUrl());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiBaseUrl(url);
    setSavedSuccess(true);
    onRefreshHealth();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    const def = resetApiBaseUrl();
    setUrl(def);
    onRefreshHealth();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card border-2 border-border p-6 md:p-8 relative shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-archivo font-black text-lg text-foreground uppercase tracking-tight">
              API CONFIGURATION
            </h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs font-archivo text-muted-foreground mb-6 leading-relaxed">
          Configure the active endpoint for the FastAPI machine-learning backend. The default local development server runs at <code className="text-primary bg-background px-1 py-0.5">http://127.0.0.1:8000</code>.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-archivo font-bold uppercase tracking-wider text-foreground mb-2">
              FastAPI Base URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary text-foreground font-archivo text-sm outline-none transition-colors"
              placeholder="http://127.0.0.1:8000"
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 text-xs font-archivo font-bold text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground flex items-center gap-1.5 uppercase transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Default</span>
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-primary hover:bg-lime-bright text-primary-foreground font-archivo font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>SAVED</span>
                </>
              ) : (
                <span>SAVE & RECONNECT</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
