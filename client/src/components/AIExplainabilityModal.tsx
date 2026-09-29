import React from 'react';
import { X, ShieldCheck, AlertCircle, HelpCircle, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { RiskAssessment } from '../types';
import { SupportIndicatorBadge } from './SupportIndicatorBadge';

interface AIExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  riskData: RiskAssessment | null;
  personnelName?: string;
  personnelId?: string;
}

export const AIExplainabilityModal: React.FC<AIExplainabilityModalProps> = ({
  isOpen,
  onClose,
  riskData,
  personnelName,
  personnelId,
}) => {
  if (!isOpen || !riskData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/30 rounded-lg border border-blue-500/30 text-blue-300">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">Explainable AI Welfare Assessment</h3>
              <p className="text-xs text-slate-400">
                {personnelName ? `${personnelName} (${personnelId})` : `Personnel ID: ${riskData.personnelId}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Score banner */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Welfare Support Indicator
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  {riskData.supportIndicator}
                </span>
                <span className="text-sm text-slate-500 font-medium">/ 100</span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <span className="text-xs text-slate-500 mb-1">Assigned Classification:</span>
              <SupportIndicatorBadge score={riskData.supportIndicator} category={riskData.category} size="md" />
            </div>
          </div>

          {/* Contributing Factors */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Contributing Factors (Operational Stressors)
              </h4>
            </div>
            {riskData.contributingFactors && riskData.contributingFactors.length > 0 ? (
              <ul className="space-y-2">
                {riskData.contributingFactors.map((factor, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-amber-50/60 border border-amber-200/80 rounded-lg text-xs md:text-sm text-amber-900"
                  >
                    <span className="text-amber-600 font-bold mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                No acute organizational stressors identified. Parameters are within regulated baseline.
              </p>
            )}
          </div>

          {/* Protective Factors */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Protective & Mitigating Factors
              </h4>
            </div>
            {riskData.protectiveFactors && riskData.protectiveFactors.length > 0 ? (
              <ul className="space-y-2">
                {riskData.protectiveFactors.map((factor, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-emerald-50/60 border border-emerald-200/80 rounded-lg text-xs md:text-sm text-emerald-900"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                Encourage proactive participation in unit peer activities and scheduled rest windows.
              </p>
            )}
          </div>

          {/* Recommended Welfare Action */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Recommended Welfare Next Steps
              </h4>
            </div>
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-2">
              {riskData.recommendedActions && riskData.recommendedActions.length > 0 ? (
                riskData.recommendedActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-blue-950">
                    <ChevronRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-blue-800">Maintain standard routine welfare check-ins.</p>
              )}
            </div>
          </div>

          {/* Transparent Formula / How It Works */}
          <div className="border-t border-slate-200 pt-4">
            <h5 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
              How Was This Calculated?
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              The Welfare Support Indicator combines organizational parameters (weekly duty hours: 18%, deployment duration: 17%, night shift frequency: 14%, leave gap: 16%) with voluntary wellness self-assessment scores (sleep quality: 13%, self-reported stress: 12%, emotional fatigue: 10%), adjusted by positive protective buffers such as team cohesion and institutional wellness participation.
            </p>
            <div className="text-[11px] font-mono bg-slate-100 p-2.5 rounded-lg border border-slate-200 text-slate-700">
              Model Version: {riskData.modelVersion || 'CRPF-WelfareNet-v2.1'} | Calibrated Confidence: {Math.round((riskData.confidenceScore || 0.88) * 100)}%
            </div>
          </div>

          {/* Mandatory Ethical Notice */}
          <div className="bg-slate-100 border border-slate-300 rounded-lg p-3 text-[11px] text-slate-600 leading-normal">
            <strong>Mandatory Welfare Guideline:</strong> {riskData.disclaimer}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
