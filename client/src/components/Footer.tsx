import React from 'react';
import { Shield, Phone, Lock, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>AI-Based Predictive Personnel Stress and Welfare Monitoring System</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Developed for the Smart India Hackathon (SIH26186 / 26186). Designed in alignment with the Ministry of Home Affairs – Central Reserve Police Force (CRPF), Police II Division specifications for preventive welfare, early intervention, and personnel well-being.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Force Welfare Helplines</span>
            </h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>CRPF Tele-Manas Helpline: <strong className="text-white">14416</strong></li>
              <li>Force Welfare Helpline: <strong className="text-white">1800-11-2773</strong></li>
              <li>Base Medical & Support: <strong className="text-white">24x7 Available</strong></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Ethical AI Standards</span>
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Support indicators are strictly preventive and non-punitive. They do not constitute psychiatric diagnoses and are never used for disciplinary evaluation.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Ministry of Home Affairs – CRPF. All Rights Reserved. Prototype demonstration for SIH26186.
          </div>
          <div className="flex items-center gap-4">
            <span>Confidential & Proprietary</span>
            <span>•</span>
            <span>Role-Based Access Protected</span>
            <span>•</span>
            <span>AES-256 Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
