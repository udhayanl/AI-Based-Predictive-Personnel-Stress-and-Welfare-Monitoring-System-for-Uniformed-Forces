import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { PublicLayout } from './layouts/PublicLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { PersonnelDashboard } from './pages/PersonnelDashboard';
import { WellnessAssessmentPage } from './pages/WellnessAssessmentPage';
import { WelfareOfficerDashboard } from './pages/WelfareOfficerDashboard';
import { PersonnelTablePage } from './pages/PersonnelTablePage';
import { PersonnelDetailPage } from './pages/PersonnelDetailPage';
import { InterventionsPage } from './pages/InterventionsPage';
import { CommanderDashboard } from './pages/CommanderDashboard';
import { AlertsPage } from './pages/AlertsPage';
import { PrivacyConsentPage } from './pages/PrivacyConsentPage';
import { BiometricsPage } from './pages/BiometricsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AIAnalyticsPage } from './pages/AIAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-xs">
        Authenticating session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Dynamic Dashboard Dispatcher based on User Role
const DashboardDispatcher: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'personnel':
      return <PersonnelDashboard />;
    case 'welfare_officer':
      return <WelfareOfficerDashboard />;
    case 'commander':
      return <CommanderDashboard />;
    case 'admin':
      return <WelfareOfficerDashboard />;
    default:
      return <PersonnelDashboard />;
  }
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Dashboard Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardDispatcher />} />
              <Route path="/assessment" element={<WellnessAssessmentPage />} />
              <Route path="/personnel" element={<PersonnelTablePage />} />
              <Route path="/personnel/:id" element={<PersonnelDetailPage />} />
              <Route path="/personnel/history" element={<PersonnelDashboard />} />
              <Route path="/personnel/workload" element={<PersonnelDashboard />} />
              <Route path="/interventions" element={<InterventionsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/privacy" element={<PrivacyConsentPage />} />
              <Route path="/biometrics" element={<BiometricsPage />} />
              <Route path="/audit-logs" element={<AuditLogsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/ai-analytics" element={<AIAnalyticsPage />} />
              <Route path="/analytics" element={<AIAnalyticsPage />} />
              <Route path="/risk-analytics" element={<AIAnalyticsPage />} />
              <Route path="/workload-analytics" element={<CommanderDashboard />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
