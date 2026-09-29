import React, { useState, useEffect } from 'react';
import { auditApi } from '../api';
import {
  FileClock,
  Search,
  Filter,
  Download,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Lock,
} from 'lucide-react';
import { EthicalDisclaimerBanner } from '../components/EthicalDisclaimerBanner';
import { AuditLog } from '../types';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const fetchLogs = () => {
    setLoading(true);
    const params: any = {};
    if (selectedRole !== 'ALL') params.role = selectedRole;
    if (selectedStatus !== 'ALL') params.status = selectedStatus;
    if (search) params.search = search;

    auditApi
      .getLogs(params)
      .then((res) => {
        if (res.data?.success) {
          setLogs(res.data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedRole, selectedStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLogs();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleExport = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'Result'];
    const rows = logs.map((l) => [
      new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      l.userId,
      l.role,
      `"${l.action}"`,
      `"${l.resource}"`,
      l.status === 'SUCCESS' ? 'Authorized' : l.status === 'DENIED' ? 'Denied' : 'Review',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `FORCEWELL_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 27. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Audit Log & Compliance Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
              Admin Exclusive
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Tamper-evident, cryptographic log of all welfare record queries, access events, and administrative changes.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      <EthicalDisclaimerBanner compact />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1 sm:flex-initial">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, user, or resource..."
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 focus:outline-none"
        >
          <option value="ALL">All Roles</option>
          <option value="personnel">Personnel</option>
          <option value="welfare_officer">Welfare Officer</option>
          <option value="commander">Commander</option>
          <option value="admin">System Admin</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 focus:outline-none"
        >
          <option value="ALL">All Outcomes</option>
          <option value="SUCCESS">Authorized Only</option>
          <option value="DENIED">Denied Access</option>
        </select>
      </div>

      {/* 27. Table: Timestamp, User, Role, Action, Resource, Result */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading audit trail entries...
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((log) => {
                  const timeStr = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const roleFormatted =
                    log.role === 'welfare_officer'
                      ? 'Welfare Officer'
                      : log.role === 'commander'
                      ? 'Commander'
                      : log.role === 'admin'
                      ? 'System Admin'
                      : 'Personnel';
                  const resultStr = log.status === 'SUCCESS' ? 'Authorized' : 'Denied';

                  return (
                    <tr key={log.logId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                        {timeStr}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                        {log.userId}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        {roleFormatted}
                      </td>
                      <td className="py-3.5 px-4 text-slate-800">
                        {log.action}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600 text-[11px]">
                        {log.resource}
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            log.status === 'SUCCESS'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-red-50 text-red-800 border border-red-200'
                          }`}
                        >
                          {resultStr}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No audit records match the selected parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
