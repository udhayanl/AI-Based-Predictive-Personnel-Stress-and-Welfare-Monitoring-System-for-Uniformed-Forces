import React, { useState, useEffect } from 'react';
import { interventionApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  HeartHandshake,
  Plus,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  UserCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Activity,
  FileText,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CreateInterventionModal } from '../components/CreateInterventionModal';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';

export const InterventionsPage: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [interventions, setInterventions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'Active' | 'Follow-up' | 'Completed'>('Active');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchInterventions = () => {
    setLoading(true);
    interventionApi
      .getList({})
      .then((res) => {
        if (res.data?.success) {
          setInterventions(res.data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchInterventions();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await interventionApi.update(id, {
        status: newStatus,
        outcome: `Status updated to ${newStatus} on ${new Date().toLocaleDateString()}`,
      });
      showToast(`Intervention status updated to ${newStatus}`, 'success');
      fetchInterventions();
    } catch {
      showToast('Unable to update intervention status.', 'error');
    }
  };

  // Tab Filtering
  const filteredByTab = interventions.filter((item) => {
    if (activeTab === 'Active') {
      return item.status === 'In Progress' || item.status === 'New' || item.status === 'Under Review' || item.status === 'Support Planned';
    }
    if (activeTab === 'Follow-up') {
      return item.status === 'Follow-up Required';
    }
    if (activeTab === 'Completed') {
      return item.status === 'Completed';
    }
    return true;
  });

  // Search filter
  const filtered = filteredByTab.filter((item) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      item.personnelId?.toLowerCase().includes(q) ||
      item.personnelName?.toLowerCase().includes(q) ||
      item.recommendation?.toLowerCase().includes(q) ||
      item.interventionType?.toLowerCase().includes(q) ||
      item.officerName?.toLowerCase().includes(q)
    );
  });

  const timelineSteps = [
    { title: 'AI indicator detected', desc: 'Predictive model flagged elevated support threshold' },
    { title: 'Officer reviewed', desc: 'Welfare officer assessed contributing duty factors' },
    { title: 'Welfare check-in', desc: 'Confidential supportive dialogue conducted' },
    { title: 'Workload reviewed', desc: 'Roster adjustment or leave gap mitigation initiated' },
    { title: 'Follow-up scheduled', desc: 'Continuous wellness re-evaluation' },
  ];

  return (
    <div className="space-y-6">
      {/* 23. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welfare Interventions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {interventions.filter((i) => i.status !== 'Completed').length} Active Cases
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Authorized support workflows, proactive workload adjustments, and recovery follow-ups.
          </p>
        </div>

        {user?.role === 'welfare_officer' && (
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Intervention</span>
          </button>
        )}
      </div>

      <EthicalDisclaimerBanner compact />

      {/* 23. Tabs: Active, Follow-up, Completed */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex border-b border-slate-200 text-xs font-semibold gap-6">
          <button
            onClick={() => setActiveTab('Active')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'Active'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Active</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px]">
              {interventions.filter((i) => i.status !== 'Completed' && i.status !== 'Follow-up Required').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('Follow-up')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'Follow-up'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Follow-up</span>
            <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-800 text-[10px]">
              {interventions.filter((i) => i.status === 'Follow-up Required').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('Completed')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'Completed'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Completed</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              {interventions.filter((i) => i.status === 'Completed').length}
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search personnel, officer, or type..."
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 23. Interventions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Personnel</th>
                <th className="py-3 px-4">Intervention</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Follow-up</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Loading interventions...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item) => {
                  const isExpanded = expandedId === item.interventionId;

                  return (
                    <React.Fragment key={item.interventionId}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div>
                            <Link
                              to={`/personnel/${item.personnelId}`}
                              className="font-mono font-bold text-blue-700 hover:underline"
                            >
                              {item.personnelId}
                            </Link>
                            <span className="block text-slate-900 font-medium text-[11px]">
                              {item.personnelName || 'Personnel'}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-semibold text-slate-800">{item.interventionType}</span>
                            <span className="block text-[11px] text-slate-500 max-w-xs truncate">
                              {item.recommendation}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {item.officerName || 'Welfare Officer'}
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                          {new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] font-medium text-blue-700">
                          {item.followUpDate
                            ? new Date(item.followUpDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
                            : 'Oct 02'}
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              item.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : item.status === 'Follow-up Required'
                                ? 'bg-orange-50 text-orange-800 border border-orange-200'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : item.interventionId)}
                            className="px-2.5 py-1 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded text-xs font-semibold transition-colors"
                          >
                            {isExpanded ? 'Hide Timeline' : 'View Timeline'}
                          </button>

                          {user?.role === 'welfare_officer' && (
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusUpdate(item.interventionId, e.target.value)}
                              className="px-2 py-1 border border-slate-300 rounded text-xs bg-white text-slate-700 focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Follow-up Required">Follow-up</option>
                              <option value="Completed">Completed</option>
                            </select>
                          )}
                        </td>
                      </tr>

                      {/* 23. Expandable Timeline Visualization */}
                      {isExpanded && (
                        <tr className="bg-slate-50/70">
                          <td colSpan={7} className="p-6">
                            <div className="space-y-4 max-w-4xl mx-auto">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Intervention Lifecycle Timeline — {item.personnelId}</span>
                                </h4>
                                <span className="text-xs text-slate-500 font-mono">
                                  ID: {item.interventionId}
                                </span>
                              </div>

                              {/* Timeline Horizontal / Stepper */}
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                                {timelineSteps.map((step, sIdx) => {
                                  const isCurrentOrPast =
                                    item.status === 'Completed'
                                      ? true
                                      : item.status === 'Follow-up Required'
                                      ? sIdx <= 4
                                      : sIdx <= 2;

                                  return (
                                    <div
                                      key={sIdx}
                                      className={`p-3 rounded-lg border text-xs space-y-1 relative ${
                                        isCurrentOrPast
                                          ? 'bg-white border-blue-300 shadow-2xs'
                                          : 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60'
                                      }`}
                                    >
                                      <div className="flex items-center gap-1.5 font-bold text-slate-900">
                                        <div
                                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                            isCurrentOrPast ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'
                                          }`}
                                        >
                                          {sIdx + 1}
                                        </div>
                                        <span>{step.title}</span>
                                      </div>
                                      <p className="text-[11px] text-slate-500 leading-snug">{step.desc}</p>
                                    </div>
                                  );
                                })}
                              </div>

                              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                                <div className="font-semibold text-slate-900">Officer Recommended Plan:</div>
                                <p className="text-slate-600">{item.recommendation}</p>
                                {item.notes && (
                                  <p className="text-slate-500 italic pt-1 border-t border-slate-100">
                                    Notes: {item.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                /* 30. EMPTY STATE */
                <tr>
                  <td colSpan={7} className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">No welfare interventions</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Interventions created by authorized welfare officers will appear here.
                      </p>
                    </div>
                    {user?.role === 'welfare_officer' && (
                      <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                      >
                        Create Intervention
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <CreateInterventionModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={fetchInterventions}
      />
    </div>
  );
};
