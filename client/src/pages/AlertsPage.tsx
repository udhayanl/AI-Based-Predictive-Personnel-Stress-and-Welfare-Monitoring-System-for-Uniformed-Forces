import React, { useState, useEffect } from 'react';
import { alertApi } from '../api';
import { useToast } from '../context/ToastContext';
import {
  Bell,
  AlertCircle,
  Info,
  Calendar,
  Check,
  Clock,
  CheckCircle2,
  Filter,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { SystemAlert } from '../types';

export const AlertsPage: React.FC = () => {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Information' | 'Attention' | 'Follow-up'>('ALL');

  const fetchAlerts = () => {
    setLoading(true);
    alertApi
      .getAlerts()
      .then((res) => {
        if (res.data?.success) {
          setAlerts(res.data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await alertApi.markRead(id);
      showToast('Notification marked as reviewed', 'info');
      fetchAlerts();
    } catch {
      showToast('Unable to update notification', 'error');
    }
  };

  // Map backend severities/types to Calm Categories: Information, Attention, Follow-up
  const categorizedAlerts = alerts.map((a) => {
    let category: 'Information' | 'Attention' | 'Follow-up' = 'Information';
    if (a.type?.includes('Follow-up') || a.title?.toLowerCase().includes('follow-up') || a.title?.toLowerCase().includes('schedule')) {
      category = 'Follow-up';
    } else if (a.severity === 'warning' || a.severity === 'attention' || a.title?.toLowerCase().includes('workload')) {
      category = 'Attention';
    } else {
      category = 'Information';
    }
    return { ...a, category };
  });

  const filtered = categorizedAlerts.filter((a) => {
    if (selectedCategory === 'ALL') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* 24. ALERTS PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welfare Notification Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {alerts.filter((a) => !a.isRead).length} Pending Review
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Calm, non-alarming updates on force duty trends, scheduled welfare follow-ups, and policy reminders.
          </p>
        </div>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* 24. Calm Categories Filter */}
      <div className="flex border-b border-slate-200 text-xs font-semibold gap-6">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`pb-2.5 transition-colors border-b-2 flex items-center gap-2 ${
            selectedCategory === 'ALL'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>All Notifications</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px]">
            {categorizedAlerts.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory('Attention')}
          className={`pb-2.5 transition-colors border-b-2 flex items-center gap-2 ${
            selectedCategory === 'Attention'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Attention</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px]">
            {categorizedAlerts.filter((a) => a.category === 'Attention').length}
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory('Follow-up')}
          className={`pb-2.5 transition-colors border-b-2 flex items-center gap-2 ${
            selectedCategory === 'Follow-up'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Follow-up</span>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px]">
            {categorizedAlerts.filter((a) => a.category === 'Follow-up').length}
          </span>
        </button>

        <button
          onClick={() => setSelectedCategory('Information')}
          className={`pb-2.5 transition-colors border-b-2 flex items-center gap-2 ${
            selectedCategory === 'Information'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>Information</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 text-[10px]">
            {categorizedAlerts.filter((a) => a.category === 'Information').length}
          </span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
            Loading notifications...
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((alert) => (
            <div
              key={alert.alertId}
              className={`p-5 rounded-xl border transition-all ${
                alert.isRead
                  ? 'bg-white border-slate-200 shadow-2xs opacity-85'
                  : 'bg-white border-slate-300 shadow-xs ring-1 ring-slate-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-lg flex-shrink-0 mt-0.5 ${
                      alert.category === 'Attention'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : alert.category === 'Follow-up'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-50 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {alert.category === 'Attention' ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : alert.category === 'Follow-up' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Info className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-slate-900">{alert.title}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          alert.category === 'Attention'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : alert.category === 'Follow-up'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {alert.category}
                      </span>
                      {!alert.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" title="Unread" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                      {alert.message}
                    </p>

                    <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{new Date(alert.createdAt).toLocaleString()}</span>
                      </span>
                      <span className="font-mono text-slate-500">
                        Target: {alert.targetId || 'Force-wide'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                  {!alert.isRead && (
                    <button
                      onClick={() => handleMarkRead(alert.alertId)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                      <span>Acknowledge</span>
                    </button>
                  )}

                  {alert.targetId && alert.targetId.startsWith('PF-') && (
                    <Link
                      to={`/personnel/${alert.targetId}`}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <span>Review</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-16 text-center space-y-2 bg-white rounded-xl border border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">All notifications caught up</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are no pending alerts in the {selectedCategory} category at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
