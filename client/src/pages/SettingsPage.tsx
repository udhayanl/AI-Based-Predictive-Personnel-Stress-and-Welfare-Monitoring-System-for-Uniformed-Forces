import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Settings,
  User,
  KeyRound,
  Bell,
  Shield,
  CheckCircle2,
  Server,
  Activity,
} from 'lucide-react';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System & Account Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your credentials, notification thresholds, and inspect institutional system diagnostics.
        </p>
      </div>

      <EthicalDisclaimerBanner compact />

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span>Active Authenticated Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Full Name</span>
            <div className="font-semibold text-slate-900 text-sm">{user?.name}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Service / Employee ID</span>
            <div className="font-mono font-semibold text-slate-900 text-sm">{user?.userId}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Official Email</span>
            <div className="font-medium text-slate-900">{user?.email}</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Authorized Role</span>
            <div className="font-semibold text-blue-700 uppercase tracking-wide">{user?.role?.replace('_', ' ')}</div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-600" />
          <span>Notification & Alert Preferences</span>
        </h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-slate-900 block">Workload Spike & Shift Imbalance Alerts</span>
              <span className="text-[11px] text-slate-500">Receive alerts when unit duty hours exceed calibrated thresholds.</span>
            </div>
            <input
              type="checkbox"
              checked={highRiskAlerts}
              onChange={(e) => setHighRiskAlerts(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-slate-900 block">Confidential Support Request Alerts</span>
              <span className="text-[11px] text-slate-500">Notifies welfare officers when personnel voluntarily request a check-in.</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-slate-900 block">Weekly Force Welfare Digest</span>
              <span className="text-[11px] text-slate-500">Summary of assessment completions, leave gap distributions, and active interventions.</span>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>

      {/* System Diagnostics & Model Version */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-400" />
          <span>System Diagnostics & Technical Specifications</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 space-y-0.5">
            <span className="text-slate-400 text-[10px]">Problem Statement</span>
            <div className="font-bold text-white">SIH26186 / 26186</div>
          </div>

          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 space-y-0.5">
            <span className="text-slate-400 text-[10px]">ML Predictive Risk Engine</span>
            <div className="font-bold text-white">CRPF-WelfareNet-v2.1</div>
          </div>

          <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 space-y-0.5">
            <span className="text-slate-400 text-[10px]">Backend Service</span>
            <div className="font-bold text-emerald-400">Node.js Express + Python Engine</div>
          </div>
        </div>
      </div>
    </div>
  );
};
