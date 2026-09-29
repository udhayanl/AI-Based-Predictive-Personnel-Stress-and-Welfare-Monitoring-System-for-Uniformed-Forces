import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Bell,
  Shield,
  User as UserIcon,
  LogOut,
  AlertTriangle,
  Info,
  Search,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Command,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { alertApi } from '../api';
import { SystemAlert } from '../types';
import { CommandPalette } from './CommandPalette';

export const Navbar: React.FC = () => {
  const { user, logout, switchDemoRole } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      alertApi.getAlerts().then((res) => {
        if (res.data?.success) {
          setAlerts(res.data.data.slice(0, 5));
          setUnreadCount(res.data.unreadCount || 0);
        }
      }).catch(() => {});
    }
  }, [user]);

  // Click outside listener for profile menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRoleSwitch = async (role: any) => {
    await switchDemoRole(role);
    showToast(`Switched active persona to ${role.replace('_', ' ').toUpperCase()}`, 'Role-based authorization updated', 'info');
    navigate('/dashboard');
  };

  const roleLabelMap: Record<string, { label: string; badge: string; color: string }> = {
    personnel: { label: 'Personnel', badge: 'FIELD UNIFORMED', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    welfare_officer: { label: 'Welfare Officer', badge: 'WELFARE MEDICAL', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    commander: { label: 'Commander', badge: 'COMMAND SECTOR', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    admin: { label: 'System Admin', badge: 'IT GOVERNANCE', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  };

  const currentRoleInfo = user ? roleLabelMap[user.role] : null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left: Product Identity & Branding */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center shadow-inner border border-blue-400/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-blue-300 transition-colors">
                    FORCEWELL AI
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-900/60 border border-blue-700/50 text-blue-300">
                    PROD v2.4
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  Personnel Welfare & Readiness Intelligence • CRPF / MHA
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Global Search (Command Palette Trigger) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search personnel ID, battalion, analytics...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-700/80 border border-slate-600 font-mono text-[10px] text-slate-300">
                Ctrl + K
              </kbd>
            </button>
          </div>

          {/* Center-Right: Demo Persona Quick Switcher */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400 px-2 font-medium text-[11px]">Role:</span>
            <button
              onClick={() => handleRoleSwitch('personnel')}
              className={`px-2.5 py-1 rounded transition-colors ${
                user?.role === 'personnel'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Personnel
            </button>
            <button
              onClick={() => handleRoleSwitch('welfare_officer')}
              className={`px-2.5 py-1 rounded transition-colors ${
                user?.role === 'welfare_officer'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Welfare Officer
            </button>
            <button
              onClick={() => handleRoleSwitch('commander')}
              className={`px-2.5 py-1 rounded transition-colors ${
                user?.role === 'commander'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Commander
            </button>
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`px-2.5 py-1 rounded transition-colors ${
                user?.role === 'admin'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Right: Notifications & User Profile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Search Icon button on mobile */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 lg:hidden"
              title="Search (Ctrl + K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="System Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-900 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Welfare Alerts</h4>
                    <Link
                      to="/alerts"
                      onClick={() => setShowNotifications(false)}
                      className="text-[11px] text-blue-600 hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {alerts.length > 0 ? (
                      alerts.map((alt) => (
                        <div key={alt.alertId} className="p-3 hover:bg-slate-50 text-xs">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-0.5">
                            {alt.severity === 'warning' ? (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            ) : (
                              <Info className="w-3.5 h-3.5 text-blue-500" />
                            )}
                            <span>{alt.title}</span>
                          </div>
                          <p className="text-slate-500 line-clamp-2 text-[11px]">{alt.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-400">No active alerts.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Menu (Section 34) */}
            {user ? (
              <div className="relative pl-1" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-800 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-700 border border-blue-400/40 flex items-center justify-center font-bold text-xs text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-semibold text-white leading-tight">{user.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{user.role.replace('_', ' ')}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-900 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="font-semibold text-slate-900">{user.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{user.userId} • {user.rank}</div>
                      <div className="mt-1">
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-semibold bg-blue-100 text-blue-800 border">
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setShowProfileMenu(false)}
                        className="px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Profile & Dashboard</span>
                      </Link>

                      <Link
                        to="/privacy"
                        onClick={() => setShowProfileMenu(false)}
                        className="px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>Role & Permissions</span>
                      </Link>

                      <Link
                        to="/privacy"
                        onClick={() => setShowProfileMenu(false)}
                        className="px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        <span>Privacy Controls</span>
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setShowProfileMenu(false)}
                        className="px-3 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings & Diagnostics</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </>
  );
};
