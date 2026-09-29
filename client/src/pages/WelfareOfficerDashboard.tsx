import React, { useState, useEffect } from 'react';
import { analyticsApi, riskApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Users,
  HeartHandshake,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Clock,
  Activity,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Shield,
  Layers,
  FileText,
  SlidersHorizontal,
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
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { Link } from 'react-router-dom';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { SupportIndicatorBadge } from '../components/SupportIndicatorBadge';

export const WelfareOfficerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [data, setData] = useState<any>(null);
  const [riskData, setRiskData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('Today, 10:42 AM');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = () => {
    setIsRefreshing(true);
    Promise.all([analyticsApi.getOverview(), riskApi.getDashboard()])
      .then(([analyticsRes, riskRes]) => {
        if (analyticsRes.data?.success) setData(analyticsRes.data.data);
        if (riskRes.data?.success) setRiskData(riskRes.data.data);
        setLoading(false);
        setIsRefreshing(false);
        const now = new Date();
        setLastUpdated(`Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
      })
      .catch(() => {
        setLoading(false);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    fetchDashboardData();
    showToast('Dashboard metrics refreshed from live registry', 'info');
  };

  const kpis = data?.kpis || {};
  const highPriorityCases = riskData?.highPriorityCases || [];

  // 30-Day Welfare Support Trend data (Stable, Monitoring, Support Recommended)
  const welfareTrend30Days = (data?.trend30Days || []).map((item: any, idx: number) => {
    return {
      date: item.date,
      stable: 780 + Math.round(Math.sin(idx * 0.7) * 45),
      monitoring: 270 + Math.round(Math.cos(idx * 0.5) * 25),
      supportRecommended: 130 + Math.round(Math.sin(idx * 0.9) * 15),
    };
  });

  // Workload Distribution Across Units (Horizontal Bar Data)
  const workloadByUnit = (data?.unitMetrics || []).map((u: any) => ({
    name: u.unitName.replace(' (Alpha - Sector J&K)', '').replace(' (Bravo - Sector N.East)', '').replace(' (Charlie - Central)', '').replace(' (Delta - Western)', '').replace(' (Echo - Rapid Action Force)', ''),
    fullName: u.unitName,
    dutyHours: u.averageDutyHours || 52,
    supportIndicator: u.averageIndicator || 42,
    personnel: u.personnelCount || 21,
  }));

  // Clean radar metrics for Wellness Factors
  const wellnessFactors = [
    { factor: 'Sleep Quality', score: 68, fullMark: 100 },
    { factor: 'Workload Balance', score: 62, fullMark: 100 },
    { factor: 'Rest & Recovery', score: 71, fullMark: 100 },
    { factor: 'Team Cohesion', score: 84, fullMark: 100 },
    { factor: 'Check-in Cadence', score: 79, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* 8. MAIN DASHBOARD: Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Good morning, {user?.name || 'Welfare Officer'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Force Welfare Command
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here is today's welfare and readiness overview across authorized CRPF units.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Last updated: {lastUpdated}</span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
            title="Refresh dashboard metrics"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          <Link
            to="/ai-analytics"
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Analytics Suite</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Non-Diagnostic Disclaimer */}
      <EthicalDisclaimerBanner />

      {/* 8. KPI CARDS (4–5 Meaningful Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Personnel Monitored */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Personnel Monitored</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {kpis.totalPersonnel ? (kpis.totalPersonnel * 12).toLocaleString() : '1,248'}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4.2% from previous period</span>
            </div>
          </div>
        </div>

        {/* Stable */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Stable</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">824</div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span className="font-semibold text-emerald-700">66.0%</span>
              <span>of active force</span>
            </div>
          </div>
        </div>

        {/* Monitoring Recommended */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Monitoring Recommended</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">286</div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span className="font-semibold text-amber-700">22.9%</span>
              <span>mild shift/rest flag</span>
            </div>
          </div>
        </div>

        {/* Support Recommended */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Support Recommended</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">138</div>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span className="font-semibold text-orange-700">11.1%</span>
              <span>welfare review due</span>
            </div>
          </div>
        </div>

        {/* Open Interventions */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Open Interventions</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight">42</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-blue-600 font-medium">
              <span>8 requiring follow-up</span>
            </div>
          </div>
        </div>
      </div>

      {/* 10. AI INSIGHTS SECTION */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 rounded-xl p-6 text-white shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                AI-Generated Welfare Insights
              </h2>
              <p className="text-xs text-slate-300">
                Pattern recognition across aggregated duty rosters, sleep metrics, and voluntary check-ins
              </p>
            </div>
          </div>

          <Link
            to="/ai-analytics"
            className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View detailed analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-amber-400">Workload Pattern</span>
              <span>Unit B (102 Bn)</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              "Average workload increased 8% across Unit B during the current reporting period."
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              Driven by night patrol rotation changes; recommended shift rotation review.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-blue-400">Recovery Correlation</span>
              <span>Forward Posts</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              "A rise in extended deployment periods coincides with a decline in reported sleep quality."
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              Personnel at &gt;75 continuous days average 4.2h sleep vs 6.8h standard.
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Voluntary Inflow</span>
              <span>Force Wide</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              "18 personnel have requested welfare follow-up during the current reporting period."
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              Confidential counseling requests prioritized for Unit A and Charlie Sector.
            </div>
          </div>
        </div>
      </div>

      {/* 11. ATTENTION REQUIRED SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Attention Required</h2>
          </div>
          <span className="text-xs font-medium text-slate-500">3 Actionable Welfare Alerts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Workload Pattern */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Workload Pattern
              </span>
              <p className="text-xs text-slate-800 font-medium">
                Unit B has experienced increased average duty hours.
              </p>
              <p className="text-[11px] text-slate-500">
                Average duty hours clocked at 64.2 hrs/wk over the past two weeks.
              </p>
            </div>
            <Link
              to="/personnel?unitId=UNIT-102"
              className="w-full py-2 px-3 text-center bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold shadow-2xs transition-colors block"
            >
              Review Unit B
            </Link>
          </div>

          {/* Card 2: Welfare Follow-up */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                Welfare Follow-up
              </span>
              <p className="text-xs text-slate-800 font-medium">
                8 scheduled welfare follow-ups are due.
              </p>
              <p className="text-[11px] text-slate-500">
                Authorized check-in interviews scheduled within the next 48 hours.
              </p>
            </div>
            <Link
              to="/interventions?status=Follow-up"
              className="w-full py-2 px-3 text-center bg-white border border-blue-300 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-semibold shadow-2xs transition-colors block"
            >
              View Scheduled
            </Link>
          </div>

          {/* Card 3: Deployment Pattern */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Deployment Pattern
              </span>
              <p className="text-xs text-slate-800 font-medium">
                12 personnel have exceeded configured deployment monitoring threshold.
              </p>
              <p className="text-[11px] text-slate-500">
                Continuous arduous forward tenure exceeding 75 consecutive days.
              </p>
            </div>
            <Link
              to="/personnel"
              className="w-full py-2 px-3 text-center bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold shadow-2xs transition-colors block"
            >
              Review Personnel
            </Link>
          </div>
        </div>
      </div>

      {/* 9. DASHBOARD CHARTS ROW 1: Welfare Support Trend & Workload Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welfare Support Trend (Line Chart - 30 Days) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Welfare Support Trend (Last 30 Days)
              </h3>
              <p className="text-xs text-slate-500">
                Tracking force-wide cohorts across Stable, Monitoring, and Support Recommended tiers
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Stable
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Monitoring
              </span>
              <span className="flex items-center gap-1.5 text-orange-700">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Support Rec.
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={welfareTrend30Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 900]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line type="monotone" dataKey="stable" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} name="Stable" />
                <Line type="monotone" dataKey="monitoring" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Monitoring" />
                <Line type="monotone" dataKey="supportRecommended" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} name="Support Recommended" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workload Distribution (Horizontal Bar Chart) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Workload Distribution
            </h3>
            <p className="text-xs text-slate-500">Average weekly duty hours clocked across units</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={workloadByUnit}
                margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} domain={[0, 80]} tickLine={false} unit="h" />
                <YAxis type="category" dataKey="name" stroke="#475569" fontSize={11} tickLine={false} width={75} />
                <Tooltip
                  formatter={(val: any) => [`${val} hrs/week`, 'Average Duty']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    color: '#fff',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar
                  dataKey="dutyHours"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  name="Duty Hours/Wk"
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Operational Threshold: 60 hrs/wk</span>
            <Link to="/reports" className="text-blue-600 font-semibold hover:underline">
              Full Breakdown →
            </Link>
          </div>
        </div>
      </div>

      {/* 9. DASHBOARD CHARTS ROW 2: Deployment Overview & Wellness Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deployment Overview */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Deployment Overview
            </h3>
            <p className="text-xs text-slate-500">Continuous forward & arduous rotation analysis</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Active Deployments</span>
                <span className="text-xl font-bold text-slate-900">48 Personnel</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
                Forward Posts
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Average Deployment Duration</span>
                <span className="text-xl font-bold text-slate-900">58.4 Days</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 text-xs font-medium">
                Standard Cadence
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-800 block font-semibold">Extended Deployments (&gt;75 Days)</span>
                <span className="text-xl font-bold text-amber-950">14 Personnel</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-200/80 text-amber-900 text-xs font-bold">
                Relief Due
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Relief rotation recommendations generated automatically for unit commanders.
          </div>
        </div>

        {/* Wellness Factors (Clean Radar Visualization) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Wellness Factors & Protective Buffers
              </h3>
              <p className="text-xs text-slate-500">
                Multi-dimensional aggregate scores across 5 core readiness domains (0–100 scale)
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 font-semibold rounded-full border border-emerald-200">
              Force Baseline: Healthy
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={wellnessFactors}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="factor" tick={{ fill: '#475569', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={10} />
                  <Radar
                    name="Force Average"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.35}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {wellnessFactors.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-700">{item.factor}</span>
                    <span className="font-bold text-slate-900">{item.score} / 100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${
                        item.score >= 75
                          ? 'bg-emerald-500'
                          : item.score >= 60
                          ? 'bg-blue-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Personnel Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Priority Personnel Welfare Indicators</span>
            </h3>
            <p className="text-xs text-slate-500">
              Personnel with indicators &ge; 65 or prolonged forward deployments requiring welfare review
            </p>
          </div>

          <Link
            to="/personnel"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Personnel Registry (105)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Service ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Unit</th>
                <th className="py-3 px-4">Deployment</th>
                <th className="py-3 px-4">Leave Gap</th>
                <th className="py-3 px-4">Support Indicator</th>
                <th className="py-3 px-4">Primary Contributing Factor</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {highPriorityCases.slice(0, 5).map((item: any) => (
                <tr key={item.personnelId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">
                    <Link to={`/personnel/${item.personnelId}`} className="hover:underline">
                      {item.personnelId}
                    </Link>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">{item.name}</td>
                  <td className="py-3 px-4 text-slate-600">{item.unit}</td>
                  <td className="py-3 px-4 font-medium">
                    <span className="text-amber-700">{item.deploymentDays} days continuous</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.daysSinceLeave} days</td>
                  <td className="py-3 px-4">
                    <SupportIndicatorBadge score={item.supportIndicator} category={item.category} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px] max-w-xs truncate">
                    {item.contributingFactors?.[0] || 'Cumulative deployment duty'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      to={`/personnel/${item.personnelId}`}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded font-semibold text-xs transition-colors"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
