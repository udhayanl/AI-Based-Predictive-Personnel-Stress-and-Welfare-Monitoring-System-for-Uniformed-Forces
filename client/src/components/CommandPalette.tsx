import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  LayoutDashboard,
  BrainCircuit,
  HeartHandshake,
  FileBarChart,
  ShieldCheck,
  Bell,
  Settings,
  X,
  ArrowRight,
  User,
} from 'lucide-react';
import { personnelApi } from '../api';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [personnelList, setPersonnelList] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      personnelApi.getList().then((res) => {
        if (res.data?.success) {
          setPersonnelList(res.data.data.slice(0, 15));
        }
      }).catch(() => {});
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPages = [
    { label: 'Executive Welfare Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4 text-blue-500" /> },
    { label: 'Personnel Risk Registry', path: '/personnel', icon: <Users className="w-4 h-4 text-emerald-500" /> },
    { label: 'AI & Predictive Analytics Suite', path: '/ai-analytics', icon: <BrainCircuit className="w-4 h-4 text-purple-500" /> },
    { label: 'Welfare Interventions Manager', path: '/interventions', icon: <HeartHandshake className="w-4 h-4 text-indigo-500" /> },
    { label: 'Institutional Reports & PDF Export', path: '/reports', icon: <FileBarChart className="w-4 h-4 text-amber-500" /> },
    { label: 'Privacy & Data Protection Center', path: '/privacy', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
    { label: 'Automated System Alerts', path: '/alerts', icon: <Bell className="w-4 h-4 text-amber-500" /> },
    { label: 'System Health & Settings', path: '/settings', icon: <Settings className="w-4 h-4 text-slate-500" /> },
  ];

  const filteredPages = quickPages.filter(p => p.label.toLowerCase().includes(query.toLowerCase()));
  const filteredPersonnel = personnelList.filter(p =>
    p.personnelId.toLowerCase().includes(query.toLowerCase()) ||
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.unitName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search personnel ID, battalion, analytics, interventions... (ESC to close)"
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Platform Sections */}
          {filteredPages.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                Navigation & Modules
              </span>
              {filteredPages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => handleSelect(page.path)}
                  className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {page.icon}
                    <span className="font-medium">{page.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
              ))}
            </div>
          )}

          {/* Personnel Quick Jump */}
          {filteredPersonnel.length > 0 && (
            <div className="space-y-1 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                Personnel Records
              </span>
              {filteredPersonnel.slice(0, 5).map((p) => (
                <button
                  key={p.personnelId}
                  onClick={() => handleSelect(`/personnel/${p.personnelId}`)}
                  className="w-full p-2.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-semibold text-slate-900">{p.name} ({p.personnelId})</div>
                      <div className="text-[10px] text-slate-400">{p.unitName} • Indicator: {p.supportIndicator}/100</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-blue-600 font-semibold">View Dossier →</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-slate-600">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
};
