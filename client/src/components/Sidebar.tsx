import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  HeartPulse,
  Briefcase,
  CalendarCheck,
  BrainCircuit,
  HeartHandshake,
  Bell,
  FileBarChart,
  ShieldCheck,
  FileClock,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const getNavLinks = () => {
    switch (user.role) {
      case 'personnel':
        return [
          { to: '/dashboard', label: 'My Wellness Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { to: '/assessment', label: 'Wellness Check-in', icon: <HeartPulse className="w-4 h-4" />, badge: 'Voluntary' },
          { to: '/personnel/workload', label: 'Workload & Rest History', icon: <CalendarCheck className="w-4 h-4" /> },
          { to: '/biometrics', label: 'Wearable Sync', icon: <Activity className="w-4 h-4" />, badge: 'Opt-in' },
          { to: '/privacy', label: 'Privacy & Consent', icon: <ShieldCheck className="w-4 h-4" /> },
          { to: '/settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> },
        ];

      case 'welfare_officer':
        return [
          { to: '/dashboard', label: 'Executive Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { to: '/personnel', label: 'Personnel Registry', icon: <Users className="w-4 h-4" /> },
          { to: '/ai-analytics', label: 'AI & Predictive Analytics', icon: <BrainCircuit className="w-4 h-4 text-purple-400" />, badge: 'ML Suite' },
          { to: '/interventions', label: 'Welfare Interventions', icon: <HeartHandshake className="w-4 h-4" /> },
          { to: '/alerts', label: 'Automated Alerts', icon: <Bell className="w-4 h-4" /> },
          { to: '/reports', label: 'Executive Reports', icon: <FileBarChart className="w-4 h-4" /> },
          { to: '/privacy', label: 'Privacy & Consent', icon: <ShieldCheck className="w-4 h-4" /> },
          { to: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];

      case 'commander':
        return [
          { to: '/dashboard', label: 'Strategic Command', icon: <LayoutDashboard className="w-4 h-4" /> },
          { to: '/personnel', label: 'Personnel Overview', icon: <Users className="w-4 h-4" />, badge: 'Masked' },
          { to: '/ai-analytics', label: 'Predictive Intelligence', icon: <BrainCircuit className="w-4 h-4 text-purple-400" /> },
          { to: '/workload-analytics', label: 'Unit Workload & Shift', icon: <Briefcase className="w-4 h-4" /> },
          { to: '/alerts', label: 'Sector Alerts', icon: <Bell className="w-4 h-4" /> },
          { to: '/reports', label: 'Command Reports', icon: <FileBarChart className="w-4 h-4" /> },
          { to: '/privacy', label: 'Privacy Principles', icon: <ShieldCheck className="w-4 h-4" /> },
          { to: '/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
        ];

      case 'admin':
        return [
          { to: '/dashboard', label: 'System Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
          { to: '/personnel', label: 'Personnel Registry', icon: <Users className="w-4 h-4" /> },
          { to: '/ai-analytics', label: 'AI Model Performance', icon: <BrainCircuit className="w-4 h-4 text-purple-400" />, badge: 'v2.4' },
          { to: '/audit-logs', label: 'Audit Trail Logs', icon: <FileClock className="w-4 h-4 text-amber-400" />, badge: 'Admin' },
          { to: '/alerts', label: 'System Alerts', icon: <Bell className="w-4 h-4" /> },
          { to: '/privacy', label: 'Governance & Consent', icon: <ShieldCheck className="w-4 h-4" /> },
          { to: '/settings', label: 'System Diagnostics', icon: <Settings className="w-4 h-4" /> },
        ];

      default:
        return [];
    }
  };

  const links = getNavLinks();

  return (
    <aside
      className={`bg-slate-900 border-r border-slate-800 text-slate-300 min-h-[calc(100vh-53px)] flex flex-col justify-between transition-all duration-200 hidden md:flex flex-shrink-0 ${
        collapsed ? 'w-16 p-2' : 'w-64 p-4'
      }`}
    >
      <div className="space-y-4">
        {/* Workspace Title Card */}
        {!collapsed ? (
          <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700/80">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
              Active Authorization
            </div>
            <div className="font-semibold text-white text-xs flex items-center justify-between">
              <span>
                {user.role === 'personnel' && 'Personnel Terminal'}
                {user.role === 'welfare_officer' && 'Welfare Command'}
                {user.role === 'commander' && 'Sector Command'}
                {user.role === 'admin' && 'System Administration'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 truncate">{user.name}</div>
          </div>
        ) : (
          <div className="text-center py-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block ring-2 ring-slate-800" />
          </div>
        )}

        {/* Navigation list */}
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              title={collapsed ? link.label : undefined}
              className={({ isActive }) =>
                `flex items-center rounded-lg text-xs font-medium transition-all ${
                  collapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </div>
              {!collapsed && link.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-700 text-slate-200 font-mono">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Collapse button & Privacy Notice */}
      <div className="pt-3 border-t border-slate-800 space-y-3">
        {!collapsed && (
          <div className="p-2.5 bg-blue-950/40 border border-blue-800/30 rounded-lg text-[10px] text-blue-200 leading-normal">
            <span className="font-semibold block text-blue-100">Confidential Defense Portal</span>
            All access logged under IT & DPDP Act guidelines.
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs flex items-center justify-center gap-1 transition-colors`}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px]">Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
