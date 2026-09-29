import React, { useState, useEffect } from 'react';
import { personnelApi } from '../api';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Search,
  Filter,
  Download,
  Printer,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  FileSpreadsheet,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SupportIndicatorBadge } from '../components/SupportIndicatorBadge';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { CreateInterventionModal } from '../components/CreateInterventionModal';

export const PersonnelTablePage: React.FC = () => {
  const { user } = useAuth();
  const [personnelList, setPersonnelList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedWorkload, setSelectedWorkload] = useState('ALL');
  const [selectedDeployment, setSelectedDeployment] = useState('ALL');

  // Intervention modal
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);
  const [targetPersonnel, setTargetPersonnel] = useState<{ id: string; name: string } | null>(null);

  const fetchPersonnel = () => {
    setLoading(true);
    const params: any = {};
    if (selectedUnit !== 'ALL') params.unitId = selectedUnit;
    if (selectedCategory !== 'ALL') params.category = selectedCategory;
    if (selectedWorkload !== 'ALL') params.workload = selectedWorkload;
    if (selectedDeployment === 'extended') params.minDeployment = 75;
    if (selectedDeployment === 'moderate') params.minDeployment = 45;
    if (search) params.search = search;

    personnelApi
      .getList(params)
      .then((res) => {
        if (res.data?.success) {
          setPersonnelList(res.data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchPersonnel();
  }, [selectedUnit, selectedCategory, selectedWorkload, selectedDeployment]);

  // Handle Search Debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPersonnel();
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Personnel ID', 'Name / Identifier', 'Unit', 'Deployment (Days)', 'Duty (Hrs/Wk)', 'Leave Gap (Days)', 'Support Indicator', 'Category', 'Status', 'Recommended Action'];
    const rows = personnelList.map(p => [
      p.personnelId,
      user?.role === 'commander' ? p.anonymizedCode : p.name,
      p.unitName,
      p.deploymentDurationDays,
      p.currentDutyHoursWeekly,
      p.daysSinceLastLeave,
      p.supportIndicator,
      p.category,
      p.status,
      `"${(p.recommendedAction || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CRPF_Welfare_Personnel_Registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenIntervention = (p: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetPersonnel({ id: p.personnelId, name: p.name });
    setInterventionModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Personnel Welfare & Risk Registry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              {personnelList.length} Active Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {user?.role === 'commander'
              ? 'Aggregated personnel overview with anonymized identifiers for privacy preservation.'
              : 'Authorized welfare monitoring table with multi-factor stress indicators and direct intervention routing.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print View</span>
          </button>
        </div>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, name, rank..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Unit selector */}
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
          >
            <option value="ALL">All Battalions (5 Units)</option>
            <option value="UNIT-101">101 Bn (Alpha - Sector J&K)</option>
            <option value="UNIT-102">102 Bn (Bravo - Sector N.East)</option>
            <option value="UNIT-103">103 Bn (Charlie - Central)</option>
            <option value="UNIT-104">104 Bn (Delta - Western)</option>
            <option value="UNIT-105">105 Bn (Echo - Rapid Action Force)</option>
          </select>

          {/* Support Indicator category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
          >
            <option value="ALL">All Support Tiers</option>
            <option value="Elevated Support">Elevated Support (&ge; 65)</option>
            <option value="Monitor">Monitor (40 - 64)</option>
            <option value="Stable">Stable (0 - 39)</option>
          </select>

          {/* Workload level */}
          <select
            value={selectedWorkload}
            onChange={(e) => setSelectedWorkload(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
          >
            <option value="ALL">All Duty Schedules</option>
            <option value="High">Heavy Load (&gt; 60 hrs/wk)</option>
            <option value="Moderate">Moderate (48 - 60 hrs/wk)</option>
            <option value="Low">Regulated (&lt; 48 hrs/wk)</option>
          </select>

          {/* Deployment filter */}
          <select
            value={selectedDeployment}
            onChange={(e) => setSelectedDeployment(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
          >
            <option value="ALL">All Deployment Lengths</option>
            <option value="extended">Extended (&gt; 75 continuous days)</option>
            <option value="moderate">Moderate (&gt; 45 continuous days)</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Service ID</th>
                <th className="py-3.5 px-4">{user?.role === 'commander' ? 'De-identified Code' : 'Name & Rank'}</th>
                <th className="py-3.5 px-4">Battalion / Unit</th>
                <th className="py-3.5 px-4">Deployment</th>
                <th className="py-3.5 px-4">Workload</th>
                <th className="py-3.5 px-4">Sleep</th>
                <th className="py-3.5 px-4">Leave Gap</th>
                <th className="py-3.5 px-4">Support Indicator</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    Loading personnel registry...
                  </td>
                </tr>
              ) : personnelList.length > 0 ? (
                personnelList.map((p) => {
                  const isElevated = p.supportIndicator >= 65;
                  const isModerate = p.supportIndicator >= 40 && p.supportIndicator < 65;

                  return (
                    <tr
                      key={p.personnelId}
                      className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                        <Link to={`/personnel/${p.personnelId}`} className="group-hover:underline flex items-center gap-1">
                          <span>{p.personnelId}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        <div>
                          {user?.role === 'commander' ? (
                            <span className="font-mono text-slate-600 font-semibold">{p.anonymizedCode}</span>
                          ) : (
                            <>
                              <span>{p.name}</span>
                              <span className="block text-[11px] text-slate-500 font-normal">{p.designation}</span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700">
                        {p.unitName}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={p.deploymentDurationDays > 75 ? 'font-semibold text-amber-700' : 'text-slate-600'}>
                          {p.deploymentDurationDays} days
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={p.currentDutyHoursWeekly > 60 ? 'font-semibold text-amber-700' : 'text-slate-600'}>
                          {p.currentDutyHoursWeekly} hrs/wk
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={p.sleepQualityAvg <= 4.0 ? 'text-amber-700 font-medium' : 'text-slate-600'}>
                          {p.sleepQualityAvg} / 10
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={p.daysSinceLastLeave > 75 ? 'font-semibold text-amber-700' : 'text-slate-600'}>
                          {p.daysSinceLastLeave} days ago
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <SupportIndicatorBadge score={p.supportIndicator} category={p.category} size="sm" />
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            p.status === 'Support Recommended'
                              ? 'bg-amber-100 text-amber-800'
                              : p.status === 'Monitor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <Link
                          to={`/personnel/${p.personnelId}`}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold transition-colors"
                        >
                          Details
                        </Link>
                        {user?.role === 'welfare_officer' && (
                          <button
                            onClick={(e) => handleOpenIntervention(p, e)}
                            className="px-2.5 py-1 bg-slate-800 text-white hover:bg-slate-900 rounded text-xs font-medium transition-colors"
                          >
                            Support
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    No personnel found matching the specified filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Intervention Modal */}
      {targetPersonnel && (
        <CreateInterventionModal
          isOpen={interventionModalOpen}
          onClose={() => setInterventionModalOpen(false)}
          personnelId={targetPersonnel.id}
          personnelName={targetPersonnel.name}
          onSuccess={fetchPersonnel}
        />
      )}
    </div>
  );
};
