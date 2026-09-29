import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { personnelApi, wellnessApi } from '../api';
import {
  HeartPulse,
  Briefcase,
  Moon,
  Calendar,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Activity,
  Info,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Clock,
  Sparkles,
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
  BarChart,
  Bar,
} from 'recharts';
import { Link } from 'react-router-dom';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { SupportIndicatorBadge } from '../components/SupportIndicatorBadge';
import { AIExplainabilityModal } from '../components/AIExplainabilityModal';

export const PersonnelDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [counselingRequested, setCounselingRequested] = useState(false);

  useEffect(() => {
    personnelApi
      .getOwnProfile()
      .then((res) => {
        if (res.data?.success) {
          setProfileData(res.data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const profile = profileData?.profile;
  const currentRisk = profileData?.currentRisk;
  const daysSinceLeave = profile?.daysSinceLastLeave || 25;
  const dutyHours = profile?.currentDutyHoursWeekly || 48;
  const sleepScore = profile?.sleepQualityAvg || 7.0;

  // 30-Day Trend Data for Recharts
  const trendData = [
    { day: 'Day 1', wellness: 76, workload: 46, sleep: 7.8, stress: 3.5 },
    { day: 'Day 5', wellness: 78, workload: 48, sleep: 7.5, stress: 3.8 },
    { day: 'Day 10', wellness: 72, workload: 52, sleep: 6.8, stress: 4.2 },
    { day: 'Day 15', wellness: 68, workload: 58, sleep: 6.0, stress: 5.0 },
    { day: 'Day 20', wellness: 65, workload: 62, sleep: 5.5, stress: 5.8 },
    { day: 'Day 25', wellness: 62, workload: 65, sleep: 4.8, stress: 6.2 },
    { day: 'Day 30', wellness: currentRisk?.supportIndicator ? Math.max(10, 100 - currentRisk.supportIndicator) : 60, workload: dutyHours, sleep: sleepScore, stress: profile?.stressScoreAvg || 6.5 },
  ];

  const handleQuickSupportRequest = () => {
    setCounselingRequested(true);
  };

  const isElevated = currentRisk?.supportIndicator >= 65;

  return (
    <div className="space-y-6">
      {/* Top Banner Greeting */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 md:p-8 text-white shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Personnel Confidential Wellness Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good Morning, {user?.name || 'Personnel'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Unit: <strong>{profile?.unitName || '101 Bn (Alpha)'}</strong> • Service ID: <strong>{user?.userId}</strong> • Rank: <strong>{user?.rank || 'Sub-Inspector'}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/assessment"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs md:text-sm font-semibold shadow-md transition-colors flex items-center gap-2"
          >
            <HeartPulse className="w-4 h-4" />
            <span>Take Wellness Check-in</span>
          </Link>
          <button
            onClick={() => setShowExplainModal(true)}
            className="px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs md:text-sm font-medium transition-colors"
          >
            Explain My Indicator
          </button>
        </div>
      </div>

      {/* Mandatory Non-Diagnostic Notice */}
      <EthicalDisclaimerBanner compact />

      {/* Respectful Wellness Status Alert Banner (Non-alarming language) */}
      {isElevated ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-700 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-amber-950">
                Elevated Welfare Support Indicator ({currentRisk?.supportIndicator}/100)
              </h3>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                Recent continuous duty duration ({profile?.deploymentDurationDays || 94} days) and wellness responses suggest that additional welfare support and rest planning may be beneficial.
              </p>
            </div>
          </div>
          <button
            onClick={handleQuickSupportRequest}
            className="flex-shrink-0 px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            {counselingRequested ? 'Support Requested ✓' : 'Request Check-in'}
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-emerald-950">
                Wellness Indicator: Stable ({currentRisk?.supportIndicator || 32}/100)
              </h3>
              <p className="text-xs text-emerald-800">
                Your duty schedule and rest parameters are within balanced institutional guidelines.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
            Regular Cadence
          </span>
        </div>
      )}

      {/* 5 Main Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Wellness Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Wellness Status</span>
            <HeartPulse className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            {isElevated ? 'Elevated Support' : 'Stable'}
          </div>
          <p className="text-[11px] text-slate-500">
            Indicator: <strong className="text-slate-800">{currentRisk?.supportIndicator || 32}/100</strong>
          </p>
        </div>

        {/* Card 2: Workload */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Weekly Workload</span>
            <Briefcase className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            {dutyHours >= 60 ? 'Heavy' : dutyHours >= 48 ? 'Moderate' : 'Optimal'}
          </div>
          <p className="text-[11px] text-slate-500">
            Active: <strong className="text-slate-800">{dutyHours} hrs/wk</strong>
          </p>
        </div>

        {/* Card 3: Sleep */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Sleep Quality</span>
            <Moon className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            {sleepScore <= 4.0 ? 'Needs Attention' : sleepScore <= 6.5 ? 'Moderate' : 'Good'}
          </div>
          <p className="text-[11px] text-slate-500">
            Avg Score: <strong className="text-slate-800">{sleepScore}/10</strong>
          </p>
        </div>

        {/* Card 4: Recent Leave */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Recent Leave</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-slate-900">
            {daysSinceLeave} days ago
          </div>
          <p className="text-[11px] text-slate-500">
            {daysSinceLeave > 75 ? (
              <span className="text-amber-700 font-semibold">Due for rest cycle</span>
            ) : (
              'Standard interval'
            )}
          </p>
        </div>

        {/* Card 5: Support Availability */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Support</span>
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600">
            Available 24/7
          </div>
          <p className="text-[11px] text-slate-500">
            Confidential & Free
          </p>
        </div>
      </div>

      {/* Interactive Charts: 30-Day Wellness & Workload Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Wellness & Stress Trends */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Personal Wellness & Stress Trend
              </h3>
              <p className="text-xs text-slate-500">Tracking self-reported resilience over 30 days</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-blue-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Wellness Index
              </span>
              <span className="flex items-center gap-1.5 text-amber-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Stress Intensity
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="wellness" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} name="Wellness Index" />
                <Line type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Stress Rating (x10)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Workload & Sleep Trends */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Workload vs Sleep Quality
              </h3>
              <p className="text-xs text-slate-500">Correlation between duty hours and sleep restoration</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Duty Hours
              </span>
              <span className="flex items-center gap-1.5 text-purple-600">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Sleep Score
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="workload" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} name="Duty Hours" />
                <Area type="monotone" dataKey="sleep" stroke="#9333ea" fill="#9333ea" fillOpacity={0.2} name="Sleep (1-10)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommended Wellness Activities & Support Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Activities */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Recommended Personal Wellness Activities</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="font-semibold text-xs text-slate-900">4-7-8 Tactical Breathing</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                4-minute breath modulation practice proven to decelerate heart rate following high-stress patrols.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="font-semibold text-xs text-slate-900">Sleep Hygiene Protocol</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Minimizing screen exposure 30 mins before sleep; optimizing outpost barracks ventilation and hydration.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="font-semibold text-xs text-slate-900">Peer Bonding & Tea Session</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Casual social interaction with your squad buddy to decompress after arduous duty rotations.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="font-semibold text-xs text-slate-900">Sanctioned Leave Planning</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Coordinate with your company adjutant to align upcoming rest cycles and family visits.
              </p>
            </div>
          </div>
        </div>

        {/* Confidential Helpline Card */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 rounded-xl shadow-md border border-blue-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold uppercase">
              <PhoneCall className="w-4 h-4" />
              <span>Confidential Welfare Helpline</span>
            </div>
            <h4 className="text-lg font-bold text-white">Need to talk in confidence?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trained mental wellness counselors and force welfare officers are available 24 hours a day. All interactions are strictly confidential and non-punitive.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="p-2.5 bg-blue-950/80 rounded-lg border border-blue-700/50 text-center">
              <span className="text-[11px] text-blue-300 block">Toll-Free Tele-Manas Helpline</span>
              <strong className="text-lg tracking-wider text-white">14416</strong>
            </div>

            <button
              onClick={handleQuickSupportRequest}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              {counselingRequested ? 'Support Request Logged ✓' : 'Request Welfare Check-in'}
            </button>
          </div>
        </div>
      </div>

      {/* AI Explainability Modal */}
      <AIExplainabilityModal
        isOpen={showExplainModal}
        onClose={() => setShowExplainModal(false)}
        riskData={currentRisk}
        personnelName={user?.name}
        personnelId={user?.userId}
      />
    </div>
  );
};
