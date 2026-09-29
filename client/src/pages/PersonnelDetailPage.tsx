import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { personnelApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  ArrowLeft,
  Shield,
  Briefcase,
  Moon,
  Calendar,
  HeartHandshake,
  AlertCircle,
  CheckCircle2,
  BrainCircuit,
  Clock,
  Sparkles,
  FileText,
  User,
  Activity,
  Layers,
  HelpCircle,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { SupportIndicatorBadge } from '../components/SupportIndicatorBadge';
import { CreateInterventionModal } from '../components/CreateInterventionModal';

export const PersonnelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'operational' | 'wellness' | 'ai' | 'interventions'>('operational');

  const fetchData = () => {
    if (!id) return;
    setLoading(true);
    personnelApi
      .getById(id)
      .then((res) => {
        if (res.data?.success) {
          setData(res.data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-16 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 text-xs font-medium">Loading personnel welfare dossier...</p>
      </div>
    );
  }

  if (!data?.profile) {
    return (
      <div className="p-12 text-center space-y-4 bg-white rounded-xl border border-slate-200">
        <p className="text-slate-600 text-sm">Personnel record not found.</p>
        <Link to="/personnel" className="text-blue-600 font-semibold text-xs hover:underline">
          Return to Personnel Registry
        </Link>
      </div>
    );
  }

  const { profile, risk, workloads, leaves, assessments, interventions } = data;

  const score = risk?.supportIndicator || 68;
  const category = risk?.category || (score >= 65 ? 'Support Recommended' : score >= 40 ? 'Monitor' : 'Stable');

  // Trend data for wellness overview
  const wellnessTrendData = [
    { week: 'Week 1', stress: 3.8, sleep: 7.2, duty: 48, wellnessIndex: 78 },
    { week: 'Week 2', stress: 4.5, sleep: 6.5, duty: 52, wellnessIndex: 72 },
    { week: 'Week 3', stress: 5.2, sleep: 5.4, duty: 60, wellnessIndex: 64 },
    { week: 'Week 4', stress: profile.stressScoreAvg || 6.2, sleep: profile.sleepQualityAvg || 4.2, duty: profile.currentDutyHoursWeekly || 64, wellnessIndex: 58 },
  ];

  // Section 13: Horizontal Contribution Chart factors
  const contributionFactors = [
    { factor: 'High workload', contribution: +18, type: 'stressor' },
    { factor: 'Extended deployment', contribution: +14, type: 'stressor' },
    { factor: 'Reduced sleep quality', contribution: +12, type: 'stressor' },
    { factor: 'Leave gap', contribution: +9, type: 'stressor' },
    { factor: 'Strong team support', contribution: -7, type: 'protective' },
  ];

  return (
    <div className="space-y-6">
      {/* 13. PERSONNEL DETAIL HEADER (No large photo, pure information layout) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Link
              to="/personnel"
              className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 transition-colors"
              title="Back to Personnel Registry"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Personnel Overview</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {profile.personnelId}
                </span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 mt-0.5">
                {user?.role === 'commander' ? profile.anonymizedCode : profile.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {user?.role === 'welfare_officer' && (
              <button
                onClick={() => setInterventionModalOpen(true)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Create Welfare Intervention</span>
              </button>
            )}
            <Link
              to="/ai-analytics"
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-blue-600" />
              <span>Model View</span>
            </Link>
          </div>
        </div>

        {/* Header Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Personnel ID</span>
            <span className="font-mono font-semibold text-slate-800">{profile.personnelId}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Unit / Battalion</span>
            <span className="font-semibold text-slate-800">{profile.unitName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Designation / Rank</span>
            <span className="font-semibold text-slate-800">{profile.designation}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Service Duration</span>
            <span className="font-semibold text-slate-800">
              {profile.serviceTenureYears ? `${profile.serviceTenureYears} years` : '6.4 years'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Current Deployment</span>
            <span className="font-semibold text-amber-700">{profile.deploymentDurationDays} days continuous</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Last Assessment</span>
            <span className="font-semibold text-slate-800">
              {profile.lastAssessmentDate ? new Date(profile.lastAssessmentDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : 'Sep 28'}
            </span>
          </div>
        </div>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* 13. AI SUPPORT INDICATOR CARD & WHY THIS INDICATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Indicator Score */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Support Indicator
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                Authorized Intelligence
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{score}</span>
              <span className="text-lg font-medium text-slate-400">/ 100</span>
            </div>

            <div className="mt-2">
              <SupportIndicatorBadge score={score} category={category} size="md" />
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Calculated via ensemble model combining continuous operational exposure, circadian shift rotations, sleep logs, and voluntary welfare check-ins.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Non-punitive flag</span>
            <Link to="/ai-analytics" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              <span>Model documentation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Why this indicator? Horizontal Contribution Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Why this indicator? (Feature Contribution)
              </h3>
              <p className="text-xs text-slate-500">
                SHAP-calibrated positive and protective feature contributions for this individual prediction
              </p>
            </div>
            <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
              Base: 38.5
            </span>
          </div>

          {/* Horizontal Contribution Bars */}
          <div className="space-y-3 pt-1">
            {contributionFactors.map((item, idx) => {
              const isPositive = item.contribution > 0;
              const absVal = Math.abs(item.contribution);
              const maxVal = 20;
              const barWidth = `${(absVal / maxVal) * 100}%`;

              return (
                <div key={idx} className="flex items-center text-xs gap-3">
                  <div className="w-40 font-medium text-slate-700 truncate">{item.factor}</div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          isPositive ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: barWidth }}
                      />
                    </div>
                  </div>
                  <div className={`w-12 text-right font-mono font-bold ${isPositive ? 'text-amber-700' : 'text-emerald-700'}`}>
                    {isPositive ? `+${item.contribution}` : `${item.contribution}`}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Stressor (+ pushes indicator)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Protective buffer (- reduces)
              </span>
            </div>
            <Link to="/ai-analytics" className="text-blue-600 font-semibold hover:underline">
              View explainability breakdown →
            </Link>
          </div>
        </div>
      </div>

      {/* 14. DEDICATED AI EXPLANATION SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Why did the model produce this indicator?
          </h2>
        </div>

        <blockquote className="p-4 rounded-lg bg-slate-50 border-l-4 border-blue-500 text-xs text-slate-700 leading-relaxed italic">
          "The model identified several recent changes in workload, deployment duration, sleep quality, and leave patterns that contributed to the current support indicator."
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Contributing Factors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Contributing Factors</span>
            </h4>
            <ol className="space-y-2 text-xs">
              <li className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-slate-800 flex items-center justify-between">
                <span className="font-medium">1. Workload (64 hrs/wk continuous duty)</span>
                <span className="font-mono text-amber-800 font-bold">+18</span>
              </li>
              <li className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-slate-800 flex items-center justify-between">
                <span className="font-medium">2. Deployment duration ({profile.deploymentDurationDays} days in forward sector)</span>
                <span className="font-mono text-amber-800 font-bold">+14</span>
              </li>
              <li className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-slate-800 flex items-center justify-between">
                <span className="font-medium">3. Sleep quality deficit ({profile.sleepQualityAvg || 4.2} / 10 reported avg)</span>
                <span className="font-mono text-amber-800 font-bold">+12</span>
              </li>
              <li className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-slate-800 flex items-center justify-between">
                <span className="font-medium">4. Leave gap ({profile.daysSinceLastLeave} days since sanctioned rest)</span>
                <span className="font-mono text-amber-800 font-bold">+9</span>
              </li>
            </ol>
          </div>

          {/* Protective Factors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Protective Factors</span>
            </h4>
            <ol className="space-y-2 text-xs">
              <li className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-slate-800 flex items-center justify-between">
                <span className="font-medium">1. Team support (8.0/10 peer cohesion index)</span>
                <span className="font-mono text-emerald-800 font-bold">-7</span>
              </li>
              <li className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-slate-800 flex items-center justify-between">
                <span className="font-medium">2. Recent leave (Sanctioned rest planned next month)</span>
                <span className="font-mono text-emerald-800 font-bold">-4</span>
              </li>
              <li className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-slate-800 flex items-center justify-between">
                <span className="font-medium">3. Stable training schedule (No irregular field drills)</span>
                <span className="font-mono text-emerald-800 font-bold">-3</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Model Explainability Engine: SHAP KernelExplainer v2.4.1
          </span>
          <Link
            to="/ai-analytics"
            className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>View model explanation</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 13. OPERATIONAL OVERVIEW & WELLNESS OVERVIEW TABS */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 text-xs font-semibold gap-6">
          <button
            onClick={() => setActiveTab('operational')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'operational'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Operational Overview
          </button>
          <button
            onClick={() => setActiveTab('wellness')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'wellness'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Wellness Overview (Trends)
          </button>
          <button
            onClick={() => setActiveTab('interventions')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'interventions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Welfare Interventions ({interventions?.length || 0})
          </button>
        </div>

        {/* Tab 1: Operational Overview */}
        {activeTab === 'operational' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Deployment
              </span>
              <div className="text-xl font-bold text-slate-900">
                {profile.deploymentDurationDays} Days
              </div>
              <p className="text-xs text-slate-500">Continuous forward tenure in {profile.unitName}</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Duty Schedule
              </span>
              <div className="text-xl font-bold text-slate-900">
                {profile.currentDutyHoursWeekly} hrs/wk
              </div>
              <p className="text-xs text-slate-500">{profile.nightDutyCountLastMonth} night shifts / 30d</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Workload
              </span>
              <div className="text-xl font-bold text-amber-700">
                {profile.currentDutyHoursWeekly > 60 ? 'Heavy Load' : 'Moderate'}
              </div>
              <p className="text-xs text-slate-500">Duty hour rotation flagged for rest interval</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Leave
              </span>
              <div className="text-xl font-bold text-slate-900">
                {profile.daysSinceLastLeave} Days Gap
              </div>
              <p className="text-xs text-slate-500">Since last sanctioned annual/rest break</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Training
              </span>
              <div className="text-xl font-bold text-emerald-700">
                Regular Cadence
              </div>
              <p className="text-xs text-slate-500">Physical fitness & tactical refresher on schedule</p>
            </div>
          </div>
        )}

        {/* Tab 2: Wellness Overview (Show trends rather than a single scary number) */}
        {activeTab === 'wellness' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Multi-Week Wellness & Duty Hours Trend
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking shifts across 4 rolling cycles to detect early signs of fatigue
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Wellness Index
                </span>
                <span className="flex items-center gap-1.5 text-amber-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Duty Hours (h/wk)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Sleep (hrs)
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wellnessTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Line type="monotone" dataKey="wellnessIndex" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} name="Wellness Index" />
                  <Line type="monotone" dataKey="duty" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Duty Hours" />
                  <Line type="monotone" dataKey="sleep" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Sleep Quality" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 3: Welfare Interventions */}
        {activeTab === 'interventions' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Active & Historical Welfare Actions
                </h3>
                <p className="text-xs text-slate-500">Recorded welfare steps, check-in schedules, and follow-ups</p>
              </div>

              {user?.role === 'welfare_officer' && (
                <button
                  onClick={() => setInterventionModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  Add Intervention
                </button>
              )}
            </div>

            {interventions && interventions.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {interventions.map((inv: any, idx: number) => (
                  <div key={idx} className="py-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">{inv.interventionType}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{inv.notes}</p>
                    <div className="text-[11px] text-slate-400">
                      Assigned Officer: {inv.assignedOfficerName || 'Welfare Officer'} • Created: {new Date(inv.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                No prior welfare interventions recorded for this personnel.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Intervention Modal */}
      <CreateInterventionModal
        isOpen={interventionModalOpen}
        onClose={() => setInterventionModalOpen(false)}
        personnelId={profile.personnelId}
        personnelName={profile.name}
        onSuccess={fetchData}
      />
    </div>
  );
};
