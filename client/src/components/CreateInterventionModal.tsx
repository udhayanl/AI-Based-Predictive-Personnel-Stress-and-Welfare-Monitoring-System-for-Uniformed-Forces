import React, { useState } from 'react';
import { X, HeartHandshake, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { interventionApi } from '../api';

interface CreateInterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  personnelId?: string;
  personnelName?: string;
  onSuccess?: () => void;
}

export const CreateInterventionModal: React.FC<CreateInterventionModalProps> = ({
  isOpen,
  onClose,
  personnelId = '',
  personnelName = '',
  onSuccess,
}) => {
  const [selectedPersonnelId, setSelectedPersonnelId] = useState(personnelId);
  const [interventionType, setInterventionType] = useState('Welfare Check-in');
  const [recommendation, setRecommendation] = useState('');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPersonnelId || !recommendation) {
      setError('Please provide Personnel ID and recommended intervention details.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await interventionApi.create({
        personnelId: selectedPersonnelId,
        interventionType,
        recommendation,
        notes,
        followUpDate: followUpDate || new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
        status: 'Support Planned',
      });
      setLoading(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register intervention.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/30 rounded-lg border border-blue-500/30 text-blue-300">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">Create Welfare Support Action</h3>
              <p className="text-xs text-slate-400">Institutional preventive welfare initiative</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Target Personnel
            </label>
            <input
              type="text"
              value={personnelName ? `${personnelName} (${selectedPersonnelId})` : selectedPersonnelId}
              onChange={(e) => setSelectedPersonnelId(e.target.value)}
              placeholder="e.g. PF-1024"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Intervention Category
            </label>
            <select
              value={interventionType}
              onChange={(e) => setInterventionType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="Welfare Check-in">Welfare Check-in (Informal Consult)</option>
              <option value="Counseling Referral">Counseling Referral (Confidential)</option>
              <option value="Workload Review">Workload Review & Duty Hours Adjustment</option>
              <option value="Leave Planning">Leave Planning & Rest Sanction</option>
              <option value="Peer Support">Peer Support / Buddy System Pairing</option>
              <option value="Rest / Recovery">Rest / Recovery Recommendation</option>
              <option value="Family Support Referral">Family Welfare & Communication Referral</option>
              <option value="Medical / Wellness Referral">Medical / Wellness Checkup</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Welfare Recommendation Details
            </label>
            <textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="e.g. Scheduled rotation from forward perimeter duty and priority 14-day leave window sanction..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Follow-up Review Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Default: 7 days from creation</p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Confidential Welfare Officer Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal welfare observation notes (restricted to welfare officers)..."
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-1.5"
            >
              {loading ? 'Registering...' : 'Initiate Intervention'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
