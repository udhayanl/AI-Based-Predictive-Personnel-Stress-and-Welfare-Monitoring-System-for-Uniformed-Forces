import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface EthicalDisclaimerBannerProps {
  compact?: boolean;
}

export const EthicalDisclaimerBanner: React.FC<EthicalDisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/80 border border-blue-200/80 rounded-md text-xs text-blue-900">
        <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
        <span>
          <strong className="font-semibold">Preventive Welfare Indicator:</strong> Not a medical or psychiatric diagnosis. Strictly for early welfare support and workload balancing.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/90 via-slate-900 to-indigo-950 text-white px-4 py-3 rounded-lg shadow-sm border border-blue-800/40 mb-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-600/30 rounded-md mt-0.5 border border-blue-400/20">
          <ShieldAlert className="w-5 h-5 text-blue-300" />
        </div>
        <div className="text-xs md:text-sm">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold tracking-wide text-blue-200 uppercase text-xs">
              Ethical AI & Welfare Protocol Notice
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono border border-emerald-500/30">
              NON-DIAGNOSTIC
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono border border-amber-500/30">
              NON-PUNITIVE
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            This platform provides <strong>AI-assisted welfare support indicators</strong> to assist authorized welfare officers and commanders with proactive support and workload distribution. It is <strong className="text-white">NOT a medical diagnosis</strong> and must <span className="underline decoration-amber-400">never</span> be used for disciplinary action, punitive measures, promotion evaluations, or stigmatization.
          </p>
        </div>
      </div>
    </div>
  );
};
