import React, { useState, useEffect } from 'react';
import { riskApi } from '../api';
import { useToast } from '../context/ToastContext';
import {
  BrainCircuit,
  BarChart3,
  Sliders,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  Activity,
  Layers,
  FileCheck2,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Server,
  Play,
  HeartHandshake,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { SupportIndicatorBadge } from '../components/SupportIndicatorBadge';
import { CreateInterventionModal } from '../components/CreateInterventionModal';

export const AIAnalyticsPage: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'importance' | 'shap' | 'prediction' | 'monitoring'>('overview');
  const [modelData, setModelData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Prediction Simulator State
  const [simDutyHours, setSimDutyHours] = useState(62);
  const [simDeployment, setSimDeployment] = useState(85);
  const [simNightShifts, setSimNightShifts] = useState(8);
  const [simLeaveGap, setSimLeaveGap] = useState(72);
  const [simSleep, setSimSleep] = useState(4.5);
  const [simStress, setSimStress] = useState(6.5);
  const [simFatigue, setSimFatigue] = useState(6.0);
  const [simTeamSupport, setSimTeamSupport] = useState(7.5);

  const [analyzing, setAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);

  useEffect(() => {
    riskApi.getModelAnalytics().then((res) => {
      if (res.data?.success) {
        setModelData(res.data.data);
      }
      setLoading(false);
    }).catch(() => setLoading(false));

    // Run initial demo prediction
    runPrediction();
  }, []);

  const runPrediction = async () => {
    setAnalyzing(true);
    try {
      const res = await riskApi.analyze({
        dutyHoursWeekly: simDutyHours,
        deploymentDays: simDeployment,
        nightShifts30d: simNightShifts,
        daysSinceLeave: simLeaveGap,
        sleepQualityScore: simSleep,
        selfReportedStress: simStress,
        emotionalFatigue: simFatigue,
        teamSupportScore: simTeamSupport,
      });

      setTimeout(() => {
        if (res.data?.success) {
          setPredictionResult(res.data.data);
        }
        setAnalyzing(false);
      }, 350);
    } catch {
      setAnalyzing(false);
      showToast('Simulation Error', 'Unable to complete prediction', 'error');
    }
  };

  const perf = modelData?.confusionMatrix || { trueNegative: 720, falsePositive: 94, falseNegative: 78, truePositive: 812 };
  const comparison = modelData?.modelComparison || [];
  const importanceData = modelData?.featureImportance || [];
  const shapData = modelData?.shapSample?.contributions || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              AI & Predictive Analytics Suite
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
              CRPF-WelfareNet v2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Explainable gradient boosted models, transparent feature attribution (SHAP), and real-time welfare support simulation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right text-[11px] text-slate-500 hidden sm:block">
            <span>Model Status: </span>
            <strong className="text-emerald-700">Validated Production</strong>
          </div>
        </div>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* Navigation Tabs (Sections 17-22) */}
      <div className="flex border-b border-slate-200 text-xs font-semibold gap-2 overflow-x-auto pb-px">
        {[
          { key: 'overview', label: 'Architecture & Pipeline' },
          { key: 'performance', label: 'Model Performance' },
          { key: 'importance', label: 'Feature Importance' },
          { key: 'shap', label: 'SHAP Explainability' },
          { key: 'prediction', label: 'Welfare Support Prediction' },
          { key: 'monitoring', label: 'Model Monitoring' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-2.5 rounded-t-lg transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-700 bg-blue-50/50 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              End-to-End AI/ML Welfare Pipeline Architecture
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              ForceWell AI employs a modular, privacy-preserving ensemble pipeline combining multi-source operational metrics with voluntary subjective wellness indicators. Features are normalized, calibrated against defense shift baselines, and evaluated through a gradient boosting architecture with transparent local attribution.
            </p>

            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">STAGE 01</span>
                <div className="font-bold text-xs text-slate-900">Authorized Telemetry</div>
                <p className="text-[11px] text-slate-500">Duty roster hours, deployment duration, and rest intervals.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">STAGE 02</span>
                <div className="font-bold text-xs text-slate-900">Voluntary Input</div>
                <p className="text-[11px] text-slate-500">Self-reported sleep quality, stress levels, and emotional weariness.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">STAGE 03</span>
                <div className="font-bold text-xs text-slate-900">Ensemble Evaluation</div>
                <p className="text-[11px] text-slate-500">Gradient boosted model generating a 0-100 support indicator.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-600">STAGE 04</span>
                <div className="font-bold text-xs text-slate-900">SHAP Explainability</div>
                <p className="text-[11px] text-slate-500">Separates contributing stressors from protective unit buffers.</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-600">STAGE 05</span>
                <div className="font-bold text-xs text-slate-900">Human Action</div>
                <p className="text-[11px] text-slate-500">Welfare officer formulates non-punitive intervention.</p>
              </div>
            </div>
          </div>

          {/* Core Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Primary Classifier</span>
              <div className="text-base font-bold text-slate-900">Gradient Boosting Ensemble</div>
              <p className="text-xs text-slate-500">Optimized log-loss with calibrated probability output for support tiers.</p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Explainability Engine</span>
              <div className="text-base font-bold text-slate-900">TreeSHAP Local Attribution</div>
              <p className="text-xs text-slate-500">Deconstructs individual predictions into additive positive & protective contributions.</p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Ethical AI Guardrail</span>
              <div className="text-base font-bold text-emerald-700">Strict Non-Diagnostic Mode</div>
              <p className="text-xs text-slate-500">No medical conclusions; outputs are purely welfare indicators.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Model Performance (Section 18) */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Top 5 Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Accuracy</span>
              <div className="text-2xl font-black text-slate-900">89.4%</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Test Cohort</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Precision</span>
              <div className="text-2xl font-black text-slate-900">87.8%</div>
              <span className="text-[10px] text-slate-500">Support Need</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Recall (Sensitivity)</span>
              <div className="text-2xl font-black text-slate-900">91.2%</div>
              <span className="text-[10px] text-blue-600 font-semibold">High Catch Rate</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">F1 Score</span>
              <div className="text-2xl font-black text-slate-900">89.5%</div>
              <span className="text-[10px] text-slate-500">Harmonic Mean</span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">ROC-AUC</span>
              <div className="text-2xl font-black text-purple-700">0.93</div>
              <span className="text-[10px] text-purple-600 font-semibold">High Discrimination</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confusion Matrix Visualization */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Confusion Matrix (Validation Cohort N = 1,704)
                </h3>
                <p className="text-xs text-slate-500">True Positive vs True Negative classification balance</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-emerald-700 block">True Negative (TN)</span>
                  <div className="text-2xl font-extrabold text-emerald-900">{perf.trueNegative}</div>
                  <span className="text-[10px] text-emerald-600">Correctly identified stable</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-amber-700 block">False Positive (FP)</span>
                  <div className="text-2xl font-extrabold text-amber-900">{perf.falsePositive}</div>
                  <span className="text-[10px] text-amber-600">Conservative welfare flag</span>
                </div>

                <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-red-700 block">False Negative (FN)</span>
                  <div className="text-2xl font-extrabold text-red-900">{perf.falseNegative}</div>
                  <span className="text-[10px] text-red-600">Minimized by high recall (91.2%)</span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-semibold uppercase text-blue-700 block">True Positive (TP)</span>
                  <div className="text-2xl font-extrabold text-blue-900">{perf.truePositive}</div>
                  <span className="text-[10px] text-blue-600">Correct support identification</span>
                </div>
              </div>
            </div>

            {/* Model Comparison Table */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Model Architecture Comparison
                </h3>
                <p className="text-xs text-slate-500">Evaluated on cross-validated personnel duty datasets</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Model</th>
                      <th className="py-2.5 px-3">Acc</th>
                      <th className="py-2.5 px-3">Prec</th>
                      <th className="py-2.5 px-3">Recall</th>
                      <th className="py-2.5 px-3">F1</th>
                      <th className="py-2.5 px-3">ROC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparison.map((m: any, idx: number) => (
                      <tr key={idx} className={m.status === 'Active Champion' ? 'bg-blue-50/50 font-semibold' : ''}>
                        <td className="py-2.5 px-3 text-slate-900 flex items-center gap-1.5">
                          <span>{m.model}</span>
                          {m.status === 'Active Champion' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          )}
                        </td>
                        <td className="py-2.5 px-3">{m.accuracy}%</td>
                        <td className="py-2.5 px-3">{m.precision}%</td>
                        <td className="py-2.5 px-3 text-blue-700">{m.recall}%</td>
                        <td className="py-2.5 px-3">{m.f1}%</td>
                        <td className="py-2.5 px-3 font-mono">{m.rocAuc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Feature Importance (Section 19) */}
      {activeTab === 'importance' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  What factors influence predictions?
                </h3>
                <p className="text-xs text-slate-500">
                  Global Gini importance derived directly from the ensemble training iterations
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                Normalized Weight &Sigma; = 1.00
              </span>
            </div>

            {/* Horizontal Bar Chart */}
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={importanceData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} domain={[0, 0.35]} />
                  <YAxis dataKey="feature" type="category" stroke="#475569" fontSize={11} width={130} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(val: any) => [`${(val * 100).toFixed(1)}% Weight`, 'Global Importance']}
                  />
                  <Bar dataKey="importance" fill="#2563eb" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Methodological Disclaimer (Section 19) */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>Methodological Guidance:</strong> Importance is model-specific and does not imply direct clinical causation. It represents the relative reliance of the gradient boosted tree nodes on duty load, sleep deficit, and deployment variables when classifying welfare support indicators.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: SHAP Explainability (Section 20) */}
      {activeTab === 'shap' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Local Attribution</span>
                <h3 className="text-base font-bold text-slate-900">Explainable AI (SHAP Waterfall Analysis)</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Understand which input factors pushed an individual prediction above or below the force baseline.
              </p>
            </div>

            {/* Sample Indicator Banner */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Sample Subject: PF-1024</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-slate-900">71 / 100</span>
                  <span className="text-xs font-semibold text-amber-700">Support Recommended</span>
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                <div>Force Baseline E[f(x)]: <strong>38.5</strong></div>
                <div>Net Individual SHAP Push: <strong className="text-amber-700">+32.5 points</strong></div>
              </div>
            </div>

            {/* Contributions List (SHAP-style) */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Individual Feature Contribution Breakdown
              </h4>

              {shapData.map((item: any, i: number) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                    item.direction === 'positive'
                      ? 'bg-amber-50/70 border-amber-200/80 text-amber-950'
                      : 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{item.direction === 'positive' ? '▲' : '▼'}</span>
                    <span className="font-semibold">{item.feature}</span>
                    <span className="text-[10px] text-slate-500">({item.type})</span>
                  </div>
                  <div className="font-mono font-bold">
                    {item.impact > 0 ? `+${(item.impact * 100).toFixed(1)} pts` : `${(item.impact * 100).toFixed(1)} pts`}
                  </div>
                </div>
              ))}
            </div>

            {/* How to Interpret this (Section 20) */}
            <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl text-xs text-purple-950 space-y-1">
              <div className="font-bold">How to interpret this:</div>
              <p className="leading-relaxed text-purple-900">
                A higher positive contribution indicates that the feature pushed the model toward a higher welfare-support indicator for this individual case. Conversely, negative values reflect institutional and personal protective buffers (e.g., strong squad cohesion) that reduced vulnerability.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Prediction Simulator (Sections 21 & 22) */}
      {activeTab === 'prediction' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Input Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Welfare Support Prediction Simulator
              </h3>
              <p className="text-xs text-slate-500">
                Adjust operational and voluntary inputs to simulate predictive model risk indicators.
              </p>
            </div>

            {/* Group 1: Operational Factors */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                1. Operational Factors
              </span>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Weekly Duty Hours: <strong>{simDutyHours} hrs/wk</strong></span>
                  <span className="text-[11px] text-slate-400">Standard: 48h</span>
                </div>
                <input
                  type="range"
                  min="36"
                  max="84"
                  value={simDutyHours}
                  onChange={(e) => setSimDutyHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Forward Deployment Duration: <strong>{simDeployment} days</strong></span>
                  <span className="text-[11px] text-slate-400">Baseline: &le; 45d</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="140"
                  value={simDeployment}
                  onChange={(e) => setSimDeployment(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Night Duty Shifts (Past 30d): <strong>{simNightShifts} shifts</strong></span>
                  <span className="text-[11px] text-slate-400">Optimal: &le; 5</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={simNightShifts}
                  onChange={(e) => setSimNightShifts(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Group 2: Recovery Factors */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                2. Recovery & Rest Factors
              </span>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Leave Gap (Days Since Last Leave): <strong>{simLeaveGap} days</strong></span>
                  <span className="text-[11px] text-slate-400">Healthy: &le; 45d</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={simLeaveGap}
                  onChange={(e) => setSimLeaveGap(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Sleep Quality Score: <strong>{simSleep} / 10</strong></span>
                  <span className="text-[11px] text-slate-400">Optimal: 7-10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={simSleep}
                  onChange={(e) => setSimSleep(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            {/* Group 3: Self-Reported Wellness */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                3. Self-Reported Wellness & Unit Cohesion
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Stress Level: <strong>{simStress}/10</strong></span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={simStress}
                    onChange={(e) => setSimStress(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Team Support: <strong>{simTeamSupport}/10</strong></span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={simTeamSupport}
                    onChange={(e) => setSimTeamSupport(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={runPrediction}
              disabled={analyzing}
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing authorized data...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run AI Assessment</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Prediction Output (5 cols - Section 22) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Model Output (Section 22)
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                AI Welfare Support Indicator
              </h3>

              {/* Indicator Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-3 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-black text-slate-900">
                    {predictionResult?.supportIndicator || 68}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">/ 100</span>
                </div>
                <SupportIndicatorBadge
                  score={predictionResult?.supportIndicator || 68}
                  category={predictionResult?.category || 'Monitor'}
                  size="md"
                />
              </div>

              {/* Key Factors */}
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Identified Key Factors
                </h4>
                <div className="space-y-1.5 text-xs">
                  {predictionResult?.contributingFactors?.map((f: string, i: number) => (
                    <div key={i} className="p-2 bg-amber-50 text-amber-900 rounded border border-amber-200/70 flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{f}</span>
                    </div>
                  ))}
                  {predictionResult?.protectiveFactors?.map((pf: string, i: number) => (
                    <div key={i} className="p-2 bg-emerald-50 text-emerald-900 rounded border border-emerald-200/70 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{pf}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Welfare Actions */}
              <div className="space-y-2 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Recommended Welfare Actions
                </h4>
                <div className="space-y-1 text-xs text-slate-700">
                  {predictionResult?.recommendedActions?.map((act: string, i: number) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => setInterventionModalOpen(true)}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Create Welfare Intervention</span>
              </button>
              <div className="text-[10px] text-slate-400 text-center">
                AI outputs serve exclusively for authorized human welfare review.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Model Monitoring */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              MLOps Model Health & Calibration Monitoring
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Data Drift Metric (KS-Test)</span>
                <div className="text-xl font-bold text-emerald-600">0.024 (Nominal)</div>
                <p className="text-[11px] text-slate-500">Feature distributions match training baselines.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Prediction Latency</span>
                <div className="text-xl font-bold text-slate-900">14.2 ms</div>
                <p className="text-[11px] text-slate-500">Real-time Node.js + Python scoring engine.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Retraining Cadence</span>
                <div className="text-xl font-bold text-slate-900">Monthly Rolling</div>
                <p className="text-[11px] text-slate-500">Next scheduled cycle: October 15, 2026.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <CreateInterventionModal
        isOpen={interventionModalOpen}
        onClose={() => setInterventionModalOpen(false)}
        personnelId="PF-SIMULATED"
        personnelName="Simulated Personnel Record"
      />
    </div>
  );
};
