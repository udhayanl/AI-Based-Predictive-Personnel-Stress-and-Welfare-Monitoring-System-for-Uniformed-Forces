import { apiClient } from './client';

export const authApi = {
  login: (credentials: { userId: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

export const personnelApi = {
  getOwnProfile: () => apiClient.get('/personnel/profile'),
  getList: (params?: Record<string, any>) => apiClient.get('/personnel', { params }),
  getById: (id: string) => apiClient.get(`/personnel/${id}`),
  update: (id: string, data: any) => apiClient.put(`/personnel/${id}`, data),
};

export const wellnessApi = {
  submitAssessment: (data: {
    stressLevel: number;
    sleepQuality: number;
    workloadLevel: number;
    emotionalFatigue: number;
    teamSupport: number;
    supportRequested?: boolean;
    supportNotes?: string;
  }) => apiClient.post('/wellness/assessment', data),
  getHistory: () => apiClient.get('/wellness/history'),
  getPersonnelAssessments: (personnelId: string) => apiClient.get(`/wellness/${personnelId}`),
};

export const riskApi = {
  analyze: (metrics: any) => apiClient.post('/risk/analyze', metrics),
  getPersonnelRisk: (personnelId: string) => apiClient.get(`/risk/${personnelId}`),
  getDashboard: () => apiClient.get('/risk/dashboard'),
  getModelAnalytics: () => apiClient.get('/risk/model-analytics'),
};

export const interventionApi = {
  create: (data: any) => apiClient.post('/interventions', data),
  getList: (params?: Record<string, any>) => apiClient.get('/interventions', { params }),
  update: (id: string, data: any) => apiClient.put(`/interventions/${id}`, data),
};

export const analyticsApi = {
  getOverview: () => apiClient.get('/analytics/overview'),
};

export const alertApi = {
  getAlerts: () => apiClient.get('/alerts'),
  markRead: (id: string) => apiClient.put(`/alerts/${id}/read`),
};

export const privacyApi = {
  getConsent: () => apiClient.get('/privacy/consent'),
  updateConsent: (data: any) => apiClient.put('/privacy/consent', data),
};

export const auditApi = {
  getLogs: (params?: Record<string, any>) => apiClient.get('/audit-logs', { params }),
};
