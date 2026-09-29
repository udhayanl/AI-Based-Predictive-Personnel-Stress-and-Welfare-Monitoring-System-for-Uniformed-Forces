import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Download,
  Printer,
  Filter,
  CheckCircle2,
  Users,
  Shield,
  Briefcase,
  BrainCircuit,
  Activity,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';

export const ReportsPage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedReport, setSelectedReport] = useState('welfare_overview');
  const [selectedDate, setSelectedDate] = useState('Current Period (September 2026)');
  const [selectedUnit, setSelectedUnit] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isGenerating, setIsGenerating] = useState(false);

  // 25. Six exact report types
  const reportTypes = [
    {
      id: 'welfare_overview',
      title: 'Welfare Overview',
      subtitle: 'Force-Wide Wellness & Readiness Baseline',
      description: 'Comprehensive force-wide wellness index, voluntary check-in rate, and support indicator breakdown.',
      metrics: [
        { label: 'Personnel Monitored', value: '1,248' },
        { label: 'Stable Proportion', value: '66.0%' },
        { label: 'Monitoring Recommended', value: '22.9%' },
        { label: 'Support Recommended', value: '11.1%' },
      ],
    },
    {
      id: 'unit_trends',
      title: 'Unit Trends',
      subtitle: 'Battalion-Level Duty & Wellness Trajectory',
      description: 'Comparative weekly trends across 5 CRPF battalions, showing rolling stress indicators vs rest intervals.',
      metrics: [
        { label: 'Units Evaluated', value: '5 Battalions' },
        { label: 'Highest Load Sector', value: 'Unit B (Sector N.East)' },
        { label: 'Unit Recovery Lead', value: 'Unit Alpha (J&K)' },
        { label: 'Variance Trend', value: '+3.2% load drift' },
      ],
    },
    {
      id: 'workload_analysis',
      title: 'Workload Analysis',
      subtitle: 'Duty Hours, Shift Rotations & Fatigue Thresholds',
      description: 'In-depth analysis of duty rosters, night duty hours, and tactical rotation imbalances.',
      metrics: [
        { label: 'Average Force Duty', value: '52.4 hrs/wk' },
        { label: 'Night Duty Shifts', value: '4.8 shifts/month' },
        { label: 'Threshold Exceedances', value: '14 personnel' },
        { label: 'Roster Balance Score', value: '88.5 / 100' },
      ],
    },
    {
      id: 'deployment_analysis',
      title: 'Deployment Analysis',
      subtitle: 'Continuous Arduous & Forward Area Rotations',
      description: 'Tracks personnel exceeding continuous forward deployment benchmarks (>75 days) and suggests relief rotations.',
      metrics: [
        { label: 'Active Deployments', value: '48 posts' },
        { label: 'Average Duration', value: '58.4 continuous days' },
        { label: 'Extended Tenures', value: '14 due for rotation' },
        { label: 'Relief Pipeline', value: '22 ready replacements' },
      ],
    },
    {
      id: 'intervention_summary',
      title: 'Intervention Summary',
      subtitle: 'Welfare Officer Actions, Support Plans & Outcomes',
      description: 'Audit log of active check-ins, scheduled counseling, workload adjustments, and restorative leave approvals.',
      metrics: [
        { label: 'Active Interventions', value: '42 cases' },
        { label: 'Follow-ups Due', value: '8 this week' },
        { label: 'Resolution Rate', value: '94.2%' },
        { label: 'Personnel Re-engagement', value: '89% positive' },
      ],
    },
    {
      id: 'ai_model_report',
      title: 'AI Model Report',
      subtitle: 'Model Performance, Drift Audits & Fairness Verifications',
      description: 'Official evaluation report covering the Gradient Boosting ensemble (89.4% accuracy, 0.93 ROC-AUC, SHAP features).',
      metrics: [
        { label: 'Model Version', value: 'v2.4.1-prod' },
        { label: 'Ensemble Accuracy', value: '89.4%' },
        { label: 'ROC-AUC Score', value: '0.93' },
        { label: 'Fairness Disparity', value: '< 1.4% (Zero Bias)' },
      ],
    },
  ];

  const currentReport = reportTypes.find((r) => r.id === selectedReport) || reportTypes[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast(`Report '${currentReport.title}' compiled successfully`, 'success');
    }, 600);
  };

  const handleExportPDF = () => {
    showToast('Preparing official PDF dossier for print/export...', 'info');
    setTimeout(() => window.print(), 300);
  };

  const handleExportCSV = () => {
    const headers = ['Report Title', 'Unit Scope', 'Reporting Period', 'Category Scope', 'Generated On', 'Security Level'];
    const rows = [
      [
        `"${currentReport.title}"`,
        `"${selectedUnit}"`,
        `"${selectedDate}"`,
        `"${selectedCategory}"`,
        `"${new Date().toISOString()}"`,
        '"OFFICIAL WELFARE REVIEW - AUTHORIZED PERSONNEL ONLY"',
      ],
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `FORCEWELL_${currentReport.id}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${currentReport.title} as CSV`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* 25. REPORTS PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Reports & Executive Intelligence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Enterprise Reporting Suite
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Generate, audit, and export official readiness and welfare briefings for authorized commanders and welfare officers.
          </p>
        </div>

        {/* 25. Buttons: Generate Report, Export PDF, Export CSV */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Compiling...' : 'Generate Report'}</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* 25. Filters: Date, Unit, Personnel category */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Report Configuration & Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Date Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Reporting Period</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Current Period (September 2026)">Current Period (September 2026)</option>
              <option value="Previous Month (August 2026)">Previous Month (August 2026)</option>
              <option value="Quarter 3 (Jul - Sep 2026)">Quarter 3 (Jul - Sep 2026)</option>
              <option value="Year-to-Date (2026)">Year-to-Date (2026)</option>
            </select>
          </div>

          {/* Unit Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Unit / Battalion Scope</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Battalions (Force-Wide Aggregate)</option>
              <option value="UNIT-101">101 Bn (Alpha - Sector J&K)</option>
              <option value="UNIT-102">102 Bn (Bravo - Sector N.East)</option>
              <option value="UNIT-103">103 Bn (Charlie - Central)</option>
              <option value="UNIT-104">104 Bn (Delta - Western)</option>
              <option value="UNIT-105">105 Bn (Echo - Rapid Action Force)</option>
            </select>
          </div>

          {/* Personnel Category */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Personnel Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Personnel Tiers</option>
              <option value="Support Recommended">Support Recommended (&ge; 65)</option>
              <option value="Monitoring Recommended">Monitoring Recommended (40 - 64)</option>
              <option value="Stable">Stable (0 - 39)</option>
              <option value="Forward Deployed">Forward Deployed (&gt;45 days)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 25. Six Report Cards Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((rep) => {
          const isSelected = selectedReport === rep.id;
          return (
            <div
              key={rep.id}
              onClick={() => setSelectedReport(rep.id)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-500'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-bold text-sm text-slate-900">{rep.title}</span>
                {isSelected ? (
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                ) : (
                  <FileText className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <span className="text-[11px] font-medium text-blue-700 block mt-0.5">{rep.subtitle}</span>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{rep.description}</p>
            </div>
          );
        })}
      </div>

      {/* Selected Report Preview Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Report Preview</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Audited & Approved
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{currentReport.title}</h2>
            <p className="text-xs text-slate-500">
              Scope: {selectedUnit} • Period: {selectedDate} • Category: {selectedCategory}
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            REF: MHA-CRPF-{currentReport.id.toUpperCase()}-2026
          </div>
        </div>

        {/* Dynamic Key Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentReport.metrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-medium text-slate-500 block">{m.label}</span>
              <div className="text-xl font-bold text-slate-900">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
          <div className="font-semibold text-slate-900">Executive Summary Findings:</div>
          <p>
            Aggregate force data during {selectedDate} indicates strong baseline resilience across the monitored personnel cohort. Early indicators for Unit B demonstrate proactive rotation mitigations are resolving initial shift spikes. No disciplinary or clinical inferences are drawn from these operational welfare scores.
          </p>
        </div>
      </div>
    </div>
  );
};
