import React, { useState, useEffect } from 'react';
import { privacyApi } from '../api';
import { useToast } from '../context/ToastContext';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Database,
  KeyRound,
  CheckCircle2,
  Sliders,
  AlertCircle,
  Clock,
  Download,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';

export const PrivacyConsentPage: React.FC = () => {
  const { showToast } = useToast();
  const [privacyData, setPrivacyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Consent states
  const [wellnessConsent, setWellnessConsent] = useState(true);
  const [biometricConsent, setBiometricConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    privacyApi
      .getConsent()
      .then((res) => {
        if (res.data?.success) {
          setPrivacyData(res.data.data);
          const c = res.data.data.consent;
          if (c) {
            setWellnessConsent(c.wellnessConsent ?? true);
            setBiometricConsent(c.biometricConsent ?? false);
            setAnalyticsConsent(c.analyticsConsent ?? true);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = async (key: 'wellnessConsent' | 'biometricConsent' | 'analyticsConsent', val: boolean) => {
    let newWellness = wellnessConsent;
    let newBiometric = biometricConsent;
    let newAnalytics = analyticsConsent;

    if (key === 'wellnessConsent') {
      newWellness = val;
      setWellnessConsent(val);
    }
    if (key === 'biometricConsent') {
      newBiometric = val;
      setBiometricConsent(val);
    }
    if (key === 'analyticsConsent') {
      newAnalytics = val;
      setAnalyticsConsent(val);
    }

    try {
      await privacyApi.updateConsent({
        wellnessConsent: newWellness,
        biometricConsent: newBiometric,
        analyticsConsent: newAnalytics,
      });
      showToast('Privacy preferences updated & recorded in audit log', 'success');
    } catch {
      showToast('Unable to update privacy settings', 'error');
    }
  };

  // 26. Data Access History
  const accessHistory = [
    { timestamp: 'Today, 10:42 AM', user: 'WO-2001', role: 'Welfare Officer', action: 'Viewed welfare record', resource: 'PF-1042', result: 'Authorized' },
    { timestamp: 'Today, 09:15 AM', user: 'CMD-3001', role: 'Commander', action: 'Accessed unit aggregate trends', resource: 'UNIT-102 (Bravo)', result: 'Authorized (De-identified)' },
    { timestamp: 'Yesterday, 16:30 PM', user: 'ADM-4001', role: 'System Admin', action: 'Security posture audit check', resource: 'Audit Vault', result: 'Authorized' },
    { timestamp: 'Sep 27, 14:10 PM', user: 'WO-2001', role: 'Welfare Officer', action: 'Logged welfare follow-up', resource: 'PF-1008', result: 'Authorized' },
  ];

  return (
    <div className="space-y-6">
      {/* 26. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Privacy & Data Protection
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              DPDP Act & MHA Compliant
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Institutional privacy safeguards, purpose limitation, granular personnel consent, and immutable access tracking.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-xs">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Last updated: Today, 10:42 AM</span>
        </div>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* 26. Consent Switches Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Personnel Consent Preferences</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            You maintain granular control over voluntary wellness inputs, optional biometric telemetry, and analytical research participation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Switch 1: Wellness Assessments */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Wellness Assessments</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    wellnessConsent ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {wellnessConsent ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Permits participation in voluntary periodic stress check-ins and calculation of supportive welfare indicators.
              </p>
            </div>
            <button
              onClick={() => handleToggle('wellnessConsent', !wellnessConsent)}
              className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                wellnessConsent
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-2xs'
              }`}
            >
              {wellnessConsent ? 'Pause Assessments' : 'Enable Assessments'}
            </button>
          </div>

          {/* Switch 2: Optional Biometric Data */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Optional Biometric Data</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    biometricConsent ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {biometricConsent ? 'OPTED IN' : 'OPTED OUT'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Sync optional resting pulse & circadian sleep duration from institutional or approved personal fitness bands.
              </p>
            </div>
            <button
              onClick={() => handleToggle('biometricConsent', !biometricConsent)}
              className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                biometricConsent
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-2xs'
              }`}
            >
              {biometricConsent ? 'Opt Out of Biometrics' : 'Opt In to Biometrics'}
            </button>
          </div>

          {/* Switch 3: Analytics Participation */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">Analytics Participation</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                    analyticsConsent ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {analyticsConsent ? 'ENABLED' : 'DISABLED'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Permit de-identified statistical participation to improve force-wide shift scheduling and fatigue models.
              </p>
            </div>
            <button
              onClick={() => handleToggle('analyticsConsent', !analyticsConsent)}
              className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                analyticsConsent
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-2xs'
              }`}
            >
              {analyticsConsent ? 'Disable Analytics' : 'Enable Analytics'}
            </button>
          </div>
        </div>
      </div>

      {/* 26. Four Core Privacy Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: What data is collected? */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              What data is collected?
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Operational Duty Logs:</strong> Total weekly duty hours, night patrol frequencies, and continuous deployment days.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Leave Intervals:</strong> Days elapsed since last sanctioned annual or casual rest leave.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Voluntary Wellness Check-ins:</strong> Self-reported stress, emotional fatigue, sleep quality, and peer support ratings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span><strong>Optional Biometrics (Opt-In):</strong> Resting heart rate and sleep duration, strictly upon explicit consent.</span>
            </li>
          </ul>
        </div>

        {/* Section 2: Why is it collected? */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Why is it collected?
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Early Fatigue Identification:</strong> Detect continuous operational overload before severe burnout develops.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Duty & Roster Balancing:</strong> Assist unit adjutants in rebalancing arduous shifts across personnel.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Proactive Welfare Support:</strong> Connect personnel with confidential counseling and rest rotation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Strict Non-Disciplinary Rule:</strong> Data is never used for promotion, grading, ACR/APAR, or disciplinary action.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Who can access it? */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Who can access it?
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span><strong>Individual Personnel:</strong> Full visibility into own profile, wellness history, and consent switches.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span><strong>Authorized Welfare Officers:</strong> Named access to coordinate welfare interventions and counseling.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span><strong>Commanders & Adjutants:</strong> Strictly anonymized and aggregated unit-level data; no individual check-in text.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span><strong>System Administrators:</strong> Technical maintenance and immutable audit log review only.</span>
            </li>
          </ul>
        </div>

        {/* Section 4: How is it protected? */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              How is it protected?
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Military-Grade Encryption:</strong> AES-256 encryption at rest and TLS 1.3 in transit.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Pseudonymization Engine:</strong> Service IDs replaced by cryptographic tokens for command analytics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Immutable Audit Trails:</strong> Every record query, view, or export logged permanently.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Automatic Data Purge:</strong> Voluntary check-in responses automatically archived after 180 days.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 26. Data Access History */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Data Access History (Recent Audit Records)
            </h3>
            <p className="text-xs text-slate-500">
              Transparent, tamper-evident log of authorized welfare and command interactions
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
            Live Stream
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accessHistory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{item.timestamp}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">{item.user}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{item.role}</td>
                  <td className="py-3 px-4 text-slate-800">{item.action}</td>
                  <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">{item.resource}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 26. Privacy Policy Citation Card */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>FORCEWELL AI Official Privacy & Ethical Charter</span>
          </div>
          <p className="text-slate-500 leading-relaxed max-w-2xl">
            Governed under Ministry of Home Affairs guidelines and the Digital Personal Data Protection Act (DPDP), 2023. Welfare assessments are legally recognized as supportive health safeguards.
          </p>
        </div>

        <button
          onClick={() => showToast('Downloading Official Forcewell Privacy Charter PDF...', 'info')}
          className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Download Policy PDF</span>
        </button>
      </div>
    </div>
  );
};
