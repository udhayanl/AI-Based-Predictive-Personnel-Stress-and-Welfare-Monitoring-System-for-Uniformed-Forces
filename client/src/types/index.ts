export type UserRole = 'personnel' | 'welfare_officer' | 'commander' | 'admin';

export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  rank: string;
  unitId: string;
  permissions: string[];
  consentStatus?: {
    wellnessConsent: boolean;
    biometricConsent: boolean;
    analyticsConsent: boolean;
  };
}

export interface PersonnelProfile {
  personnelId: string;
  userId: string;
  name: string;
  unitId: string;
  unitName: string;
  designation: string;
  joiningDate: string;
  deploymentDurationDays: number;
  currentDutyHoursWeekly: number;
  nightDutyCountLastMonth: number;
  daysSinceLastLeave: number;
  sleepQualityAvg: number;
  stressScoreAvg: number;
  emotionalFatigueAvg: number;
  teamSupportScore: number;
  anonymizedCode: string;
  displayName?: string;
  supportIndicator?: number;
  category?: 'Stable' | 'Monitor' | 'Elevated Support';
  status?: string;
  recommendedAction?: string;
  deploymentHistory?: Array<{
    location: string;
    role: string;
    startDate: string;
    endDate: string | null;
    arduousLevel: string;
  }>;
}

export interface WellnessAssessment {
  assessmentId: string;
  personnelId: string;
  stressLevel: number;
  sleepQuality: number;
  workloadLevel: number;
  emotionalFatigue: number;
  teamSupport: number;
  supportRequested: boolean;
  supportNotes: string;
  calculatedIndicator: number;
  calculatedCategory: string;
  createdAt: string;
}

export interface RiskAssessment {
  assessmentId: string;
  personnelId: string;
  supportIndicator: number;
  category: 'Stable' | 'Monitor' | 'Elevated Support';
  contributingFactors: string[];
  protectiveFactors: string[];
  factorBreakdown: {
    dutyHours: number;
    deploymentDuration: number;
    nightShifts: number;
    leaveGap: number;
    sleepDeficit: number;
    selfReportedStress: number;
    emotionalFatigue: number;
  };
  recommendedActions: string[];
  confidenceScore: number;
  modelVersion: string;
  disclaimer: string;
  generatedAt: string;
}

export interface WelfareIntervention {
  interventionId: string;
  personnelId: string;
  personnelName?: string;
  unitName?: string;
  rank?: string;
  officerId: string;
  officerName: string;
  interventionType: string;
  recommendation: string;
  notes: string;
  status: 'New' | 'Under Review' | 'Support Planned' | 'In Progress' | 'Follow-up Required' | 'Completed';
  followUpDate: string;
  outcome: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemAlert {
  alertId: string;
  unitId: string;
  targetId?: string;
  type: 'Workload Alert' | 'Welfare Follow-up' | 'Deployment Alert' | 'Leave Pattern';
  title: string;
  message: string;
  severity: 'info' | 'attention' | 'warning';
  targetRoles: string[];
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  logId: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILURE' | 'DENIED';
  timestamp: string;
}

export interface UnitMetric {
  unitId: string;
  unitName: string;
  sector: string;
  personnelCount: number;
  averageIndicator: number;
  averageDutyHours: number;
  elevatedCount: number;
  activeDeployments: number;
  status: string;
}
