import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../api';
import {
  Shield,
  Briefcase,
  Users,
  HeartPulse,
  CalendarCheck,
  AlertCircle,
  FileBarChart,
  Lock,
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { StatCard } from '../components/StatCard';
import { Link } from 'react-router-dom';

export const CommanderDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi
      .getOverview()
      .then((res) => {
        if (res.data?.success) setData(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const kpis = data?.kpis || {};
  const unitMetrics = data?.unitMetrics || [];
  const trend30Days = data?.trend30Days || [];
  const leaveGapBins = data?.leaveGapBins || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Strategic Command & Welfare Intelligence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
              Sector HQ Overview
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated force-level stress indicators, deployment duration tiers, and fatigue balancing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/reports"
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <FileBarChart className="w-3.5 h-3.5" />
            <span>Generate Executive Reports</span>
          </Link>
        </div>
      </div>

      {/* Privacy Notice for Commander Role */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs">
        <Lock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed text-slate-300">
          <span className="font-semibold text-white">Privacy-Preserving Macro Governance:</span> In accordance with the Ministry of Home Affairs personnel privacy doctrine, individual psychological self-reflections are strictly anonymized and masked. Commanders review unit-level aggregated trends to optimize shift balancing and rotation planning.
        </div>
      </div>

      {/* 6 Aggregated Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Personnel"
          value={kpis.totalPersonnel || 105}
          subtitle="5 Active Battalions"
          icon={<Users className="w-4 h-4 text-blue-600" />}
          accentColor="blue"
        />

        <StatCard
          title="Forward Deployments"
          value={kpis.activeDeployments || 55}
          subtitle="Arduous posts (>30d)"
          icon={<Briefcase className="w-4 h-4 text-indigo-600" />}
          accentColor="indigo"
        />

        <StatCard
          title="Avg Force Duty"
          value={`${kpis.averageDutyHours || 52}h`}
          subtitle="Hours per week"
          icon={<CalendarCheck className="w-4 h-4 text-amber-600" />}
          accentColor="amber"
        />

        <StatCard
          title="Force Wellness Index"
          value={`${kpis.avgIndicator ? 100 - kpis.avgIndicator : 68}/100`}
          subtitle="Institutional resilience"
          icon={<HeartPulse className="w-4 h-4 text-emerald-600" />}
          accentColor="emerald"
        />

        <StatCard
          title="Welfare Inquiries"
          value={kpis.supportRequests || 8}
          subtitle="Voluntary requests"
          icon={<HeartPulse className="w-4 h-4 text-purple-600" />}
          accentColor="slate"
        />

        <StatCard
          title="Open Interventions"
          value={kpis.activeInterventions || 3}
          subtitle="Active welfare reviews"
          icon={<Shield className="w-4 h-4 text-blue-600" />}
          accentColor="blue"
        />
      </div>

      {/* Chart 1: Unit-by-Unit Welfare Comparison */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Battalion-by-Battalion Welfare Index & Duty Load
            </h3>
            <p className="text-xs text-slate-500">
              Comparative review identifying battalions experiencing duty spikes and cumulative fatigue
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-blue-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Average Duty Hours (hrs/wk)
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Support Indicator (0-100)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={unitMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="unitName" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="averageDutyHours" fill="#3b82f6" name="Duty Hours" radius={[4, 4, 0, 0]} />
              <Bar dataKey="averageIndicator" fill="#f59e0b" name="Support Indicator" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Unit Deployment & Leave Health Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Battalion Operational Readiness & Welfare Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Macro summary of battalion duty strain, leave gap compliance, and rotation priority
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Battalion Name</th>
                <th className="py-3 px-4">Sector / Post</th>
                <th className="py-3 px-4">Personnel Count</th>
                <th className="py-3 px-4">Avg Duty Hours</th>
                <th className="py-3 px-4">Avg Support Indicator</th>
                <th className="py-3 px-4">Cases Requiring Follow-up</th>
                <th className="py-3 px-4">Welfare Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {unitMetrics.map((unit: any) => (
                <tr key={unit.unitId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{unit.unitName}</td>
                  <td className="py-3.5 px-4 text-slate-600">{unit.sector}</td>
                  <td className="py-3.5 px-4 font-medium">{unit.personnelCount} Personnel</td>
                  <td className="py-3.5 px-4">
                    <span className={unit.averageDutyHours > 55 ? 'font-semibold text-amber-700' : 'text-slate-700'}>
                      {unit.averageDutyHours} hrs/wk
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900">{unit.averageIndicator} / 100</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium">
                    <span className={unit.elevatedCount > 3 ? 'text-amber-700 font-bold' : 'text-slate-600'}>
                      {unit.elevatedCount} Personnel
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded text-[11px] font-semibold ${
                        unit.status === 'Attention Required'
                          ? 'bg-amber-100 text-amber-800'
                          : unit.status === 'Moderate Watch'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {unit.status}
                    </span>
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
