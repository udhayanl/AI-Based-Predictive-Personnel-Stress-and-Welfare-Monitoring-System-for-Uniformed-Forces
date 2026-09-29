import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Moon,
  Zap,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Watch,
  Info,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';

export const BiometricsPage: React.FC = () => {
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [consentGranted, setConsentGranted] = useState(true);

  // Simulated 24-hour biometric telemetry
  const telemetryData = [
    { time: '00:00', heartRate: 58, hrv: 68, sleepStage: 'Deep Sleep' },
    { time: '02:00', heartRate: 54, hrv: 72, sleepStage: 'Deep Sleep' },
    { time: '04:00', heartRate: 56, hrv: 70, sleepStage: 'REM' },
    { time: '06:00', heartRate: 64, hrv: 62, sleepStage: 'Light Sleep' },
    { time: '08:00', heartRate: 78, hrv: 55, sleepStage: 'Awake' },
    { time: '10:00', heartRate: 88, hrv: 48, sleepStage: 'Patrol / Active' },
    { time: '12:00', heartRate: 82, hrv: 52, sleepStage: 'Rest' },
    { time: '14:00', heartRate: 85, hrv: 49, sleepStage: 'Training' },
    { time: '16:00', heartRate: 92, hrv: 45, sleepStage: 'Perimeter Duty' },
    { time: '18:00', heartRate: 80, hrv: 54, sleepStage: 'Debrief' },
    { time: '20:00', heartRate: 72, hrv: 60, sleepStage: 'Downtime' },
    { time: '22:00', heartRate: 66, hrv: 64, sleepStage: 'Rest' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Wearable Biometric Telemetry (Prototype)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
              Optional / Consent Required
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulated smart wearable integration for passive fatigue detection, resting heart rate, and circadian recovery tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setConsentGranted(!consentGranted)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              consentGranted
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}
          >
            {consentGranted ? 'Biometric Consent: Active ✓' : 'Consent Paused'}
          </button>
        </div>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* Strict Biometric Legal / Ethical Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-semibold text-amber-950">
            Section 16 Prototype Integration & Ethical Boundaries
          </p>
          <p className="leading-relaxed text-amber-900">
            <strong>No biometric data will be collected without explicit authorization and applicable legal/organizational approval.</strong> All metrics shown below are strictly simulated for prototype evaluation. This telemetry is non-diagnostic and serves only to assist personnel with personal rest awareness.
          </p>
        </div>
      </div>

      {/* 4 Sensor Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Resting Heart Rate</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">58</span>
            <span className="text-xs text-slate-500">BPM</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">Healthy recovery zone</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Sleep Duration</span>
            <Moon className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">6.4</span>
            <span className="text-xs text-slate-500">hours</span>
          </div>
          <p className="text-[11px] text-slate-500">1.8h Deep Sleep • 1.2h REM</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Heart Rate Variability</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">62</span>
            <span className="text-xs text-slate-500">ms (rMSSD)</span>
          </div>
          <p className="text-[11px] text-slate-500">Moderate autonomic balance</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Device Sync Status</span>
            <Watch className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-emerald-600">Simulated Sync</span>
          </div>
          <p className="text-[11px] text-slate-400">Garmin/Fitbit Health API Mock</p>
        </div>
      </div>

      {/* 24-Hour Telemetry Graph */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              24-Hour Telemetry: Heart Rate & Heart Rate Variability (HRV)
            </h3>
            <p className="text-xs text-slate-500">
              Correlating circadian night rest with daytime patrol exertion
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-red-500 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Heart Rate (BPM)
            </span>
            <span className="flex items-center gap-1.5 text-blue-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> HRV (ms)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} name="Heart Rate (BPM)" />
              <Line type="monotone" dataKey="hrv" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="HRV (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
