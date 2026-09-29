import bcrypt from 'bcryptjs';
import { WelfareRiskEngine } from '../services/riskEngine.js';

// Central in-memory cache and storage used for high performance and zero-dependency standalone execution
class DataStore {
  constructor() {
    this.users = [];
    this.personnel = [];
    this.assessments = [];
    this.workloads = [];
    this.leaves = [];
    this.riskAssessments = [];
    this.interventions = [];
    this.consents = [];
    this.auditLogs = [];
    this.alerts = [];
    this.units = [];
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    console.log('[DataStore] Generating realistic fictional datasets (100+ personnel, 5 units)...');
    const passwordHash = await bcrypt.hash('password123', 10);

    // 1. Initialize 5 Units
    this.units = [
      { unitId: 'UNIT-101', unitName: '101 Bn (Alpha)', sector: 'Sector J&K', baseLocation: 'Srinagar Forward Base', commanderName: 'Commandant R. K. Verma', personnelCount: 22, averageIndicator: 52, activeDeployments: 14 },
      { unitId: 'UNIT-102', unitName: '102 Bn (Bravo)', sector: 'Sector N.East', baseLocation: 'Imphal Valley Base', commanderName: 'Commandant S. Nongmaithem', personnelCount: 20, averageIndicator: 58, activeDeployments: 15 },
      { unitId: 'UNIT-103', unitName: '103 Bn (Charlie)', sector: 'Central Sector', baseLocation: 'Raipur Operations Base', commanderName: 'Commandant A. K. Shukla', personnelCount: 21, averageIndicator: 36, activeDeployments: 8 },
      { unitId: 'UNIT-104', unitName: '104 Bn (Delta)', sector: 'Western Sector', baseLocation: 'Jodhpur Border Post', commanderName: 'Commandant M. S. Rathore', personnelCount: 20, averageIndicator: 34, activeDeployments: 7 },
      { unitId: 'UNIT-105', unitName: '105 Bn (Echo)', sector: 'Rapid Action Force', baseLocation: 'Delhi NCR Depot', commanderName: 'Commandant Pradeep Joshi', personnelCount: 22, averageIndicator: 41, activeDeployments: 11 }
    ];

    // 2. Primary Demo Users
    this.users = [
      // Fictional Personnel User (Demo Scenario: PF-1024)
      {
        userId: 'PF-1024',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@personnel.crpf.gov.in',
        passwordHash,
        role: 'personnel',
        rank: 'Sub-Inspector',
        unitId: 'UNIT-101',
        permissions: ['read:own_profile', 'submit:wellness_assessment', 'manage:own_consent', 'request:counseling'],
        consentStatus: { wellnessConsent: true, biometricConsent: false, analyticsConsent: true, consentDate: new Date('2026-01-15') },
        lastLogin: new Date()
      },
      // Fictional Welfare Officer
      {
        userId: 'WO-2001',
        name: 'Dr. Meenakshi Sharma',
        email: 'meenakshi.sharma@welfare.crpf.gov.in',
        passwordHash,
        role: 'welfare_officer',
        rank: 'Chief Welfare Officer',
        unitId: 'UNIT-101',
        permissions: ['read:welfare_data', 'read:risk_indicators', 'manage:interventions', 'generate:welfare_reports', 'schedule:follow_up'],
        consentStatus: { wellnessConsent: true, biometricConsent: false, analyticsConsent: true },
        lastLogin: new Date()
      },
      // Fictional Commander
      {
        userId: 'CMD-3001',
        name: 'Commandant Arvind Singhal',
        email: 'arvind.singhal@command.crpf.gov.in',
        passwordHash,
        role: 'commander',
        rank: 'Commandant / Sector Head',
        unitId: 'ALL',
        permissions: ['read:aggregated_analytics', 'read:unit_welfare', 'read:workload_trends', 'read:deployment_overview'],
        consentStatus: { wellnessConsent: true, biometricConsent: false, analyticsConsent: true },
        lastLogin: new Date()
      },
      // System Administrator
      {
        userId: 'ADM-4001',
        name: 'Suresh Menon',
        email: 'suresh.menon@admin.crpf.gov.in',
        passwordHash,
        role: 'admin',
        rank: 'Director (IT & Systems)',
        unitId: 'HQ',
        permissions: ['manage:users', 'manage:roles', 'read:audit_logs', 'manage:system_config', 'manage:security'],
        consentStatus: { wellnessConsent: true, biometricConsent: false, analyticsConsent: true },
        lastLogin: new Date()
      }
    ];

    // 3. Generate 105 Fictional Personnel Profiles
    const designations = ['Constable', 'Head Constable', 'Assistant Sub-Inspector', 'Sub-Inspector', 'Inspector'];
    const firstNames = ['Vikas', 'Amit', 'Sunil', 'Ramesh', 'Manoj', 'Deepak', 'Arun', 'Pawan', 'Sanjay', 'Santosh', 'Dinesh', 'Ajay', 'Harish', 'Kishore', 'Rohit', 'Suraj', 'Mahesh', 'Gopal', 'Naresh', 'Tarun', 'Anand', 'Hemant', 'Satish'];
    const lastNames = ['Singh', 'Yadav', 'Sharma', 'Verma', 'Patil', 'Meena', 'Rathore', 'Choudhary', 'Thakur', 'Nair', 'Rawat', 'Das', 'Pandey', 'Gupta', 'Reddy', 'Prasad', 'Mishra'];

    for (let i = 1; i <= 105; i++) {
      const pid = `PF-${1000 + i}`;
      const unitIndex = (i - 1) % 5;
      const unit = this.units[unitIndex];
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[(i * 3) % lastNames.length];
      const fullName = `${fn} ${ln}`;
      const designation = designations[i % designations.length];

      // Specific Demo Persona PF-1024 (Section 34 demo scenario)
      let deploymentDurationDays, currentDutyHoursWeekly, nightDutyCountLastMonth, daysSinceLastLeave;
      let sleepQualityAvg, stressScoreAvg, emotionalFatigueAvg, teamSupportScore;

      if (pid === 'PF-1024') {
        deploymentDurationDays = 94;
        currentDutyHoursWeekly = 66.0;
        nightDutyCountLastMonth = 11;
        daysSinceLastLeave = 82;
        sleepQualityAvg = 3.5;
        stressScoreAvg = 6.5;
        emotionalFatigueAvg = 7.0;
        teamSupportScore = 7.8;
      } else {
        // Realistic distribution across personnel
        const isElevatedArchetype = (i % 8 === 0);
        const isModerateArchetype = (i % 4 === 0 && !isElevatedArchetype);

        if (isElevatedArchetype) {
          deploymentDurationDays = 78 + (i % 25);
          currentDutyHoursWeekly = 62 + (i % 8);
          nightDutyCountLastMonth = 9 + (i % 5);
          daysSinceLastLeave = 76 + (i % 20);
          sleepQualityAvg = 3.8 + ((i % 10) / 10);
          stressScoreAvg = 6.8 + ((i % 15) / 10);
          emotionalFatigueAvg = 7.0 + ((i % 10) / 10);
          teamSupportScore = 5.5 + ((i % 20) / 10);
        } else if (isModerateArchetype) {
          deploymentDurationDays = 50 + (i % 25);
          currentDutyHoursWeekly = 52 + (i % 8);
          nightDutyCountLastMonth = 6 + (i % 4);
          daysSinceLastLeave = 48 + (i % 25);
          sleepQualityAvg = 5.5 + ((i % 15) / 10);
          stressScoreAvg = 5.0 + ((i % 15) / 10);
          emotionalFatigueAvg = 5.2 + ((i % 15) / 10);
          teamSupportScore = 6.5 + ((i % 20) / 10);
        } else {
          // Healthy / Stable archetype
          deploymentDurationDays = 20 + (i % 25);
          currentDutyHoursWeekly = 44 + (i % 6);
          nightDutyCountLastMonth = 2 + (i % 3);
          daysSinceLastLeave = 18 + (i % 25);
          sleepQualityAvg = 7.5 + ((i % 15) / 10);
          stressScoreAvg = 3.0 + ((i % 12) / 10);
          emotionalFatigueAvg = 3.2 + ((i % 12) / 10);
          teamSupportScore = 7.8 + ((i % 15) / 10);
        }
      }

      // Profile record
      const profile = {
        personnelId: pid,
        userId: pid,
        name: pid === 'PF-1024' ? 'Rajesh Kumar' : fullName,
        unitId: unit.unitId,
        unitName: unit.unitName,
        designation: pid === 'PF-1024' ? 'Sub-Inspector' : designation,
        joiningDate: new Date(Date.now() - (1000 * 3600 * 24 * 365 * (3 + (i % 10)))),
        deploymentDurationDays,
        currentDutyHoursWeekly,
        nightDutyCountLastMonth,
        daysSinceLastLeave,
        sleepQualityAvg: Math.round(sleepQualityAvg * 10) / 10,
        stressScoreAvg: Math.round(stressScoreAvg * 10) / 10,
        emotionalFatigueAvg: Math.round(emotionalFatigueAvg * 10) / 10,
        teamSupportScore: Math.round(teamSupportScore * 10) / 10,
        anonymizedCode: `ANON-${8000 + i}`,
        deploymentHistory: [
          { location: `${unit.sector} Sector Outpost`, role: 'Active Patrol & Area Security', startDate: new Date(Date.now() - 1000 * 3600 * 24 * deploymentDurationDays), endDate: null, arduousLevel: deploymentDurationDays > 70 ? 'High Arduous' : 'Moderate' }
        ],
        transferHistory: [
          { fromUnit: 'CRPF Depot Neemuch', toUnit: unit.unitName, transferDate: new Date(Date.now() - 1000 * 3600 * 24 * 365 * 2) }
        ],
        updatedAt: new Date()
      };
      this.personnel.push(profile);

      // Also create User account if not exists
      if (pid !== 'PF-1024') {
        this.users.push({
          userId: pid,
          name: fullName,
          email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@crpf.gov.in`,
          passwordHash,
          role: 'personnel',
          rank: designation,
          unitId: unit.unitId,
          permissions: ['read:own_profile', 'submit:wellness_assessment', 'manage:own_consent', 'request:counseling'],
          consentStatus: { wellnessConsent: true, biometricConsent: i % 3 === 0, analyticsConsent: true },
          lastLogin: new Date(Date.now() - (1000 * 3600 * (i * 4)))
        });
      }

      // Compute initial AI Risk Assessment using explainable risk engine
      const evalResult = WelfareRiskEngine.evaluateMetrics({
        dutyHoursWeekly: currentDutyHoursWeekly,
        deploymentDays: deploymentDurationDays,
        nightShifts30d: nightDutyCountLastMonth,
        daysSinceLeave: daysSinceLastLeave,
        sleepQualityScore: sleepQualityAvg,
        selfReportedStress: stressScoreAvg,
        emotionalFatigue: emotionalFatigueAvg,
        teamSupportScore,
        recentWellnessParticipation: true
      });

      this.riskAssessments.push({
        assessmentId: `RISK-${1000 + i}`,
        personnelId: pid,
        supportIndicator: evalResult.supportIndicator,
        category: evalResult.category,
        contributingFactors: evalResult.contributingFactors,
        protectiveFactors: evalResult.protectiveFactors,
        factorBreakdown: evalResult.factorBreakdown,
        recommendedActions: evalResult.recommendedActions,
        confidenceScore: evalResult.confidenceScore,
        modelVersion: evalResult.modelVersion,
        disclaimer: evalResult.disclaimer,
        generatedAt: new Date(Date.now() - (1000 * 3600 * (i % 48)))
      });

      // Consent record
      this.consents.push({
        consentId: `CNS-${1000 + i}`,
        personnelId: pid,
        wellnessConsent: true,
        biometricConsent: i % 3 === 0,
        analyticsConsent: true,
        updatedAt: new Date()
      });

      // Sample Leave Records
      this.leaves.push({
        leaveId: `LV-${1000 + i}`,
        personnelId: pid,
        leaveType: 'Annual Leave',
        startDate: new Date(Date.now() - 1000 * 3600 * 24 * (daysSinceLastLeave + 15)),
        endDate: new Date(Date.now() - 1000 * 3600 * 24 * daysSinceLastLeave),
        durationDays: 15,
        status: 'Completed',
        reason: 'Rest and recuperation cycle',
        createdAt: new Date(Date.now() - 1000 * 3600 * 24 * (daysSinceLastLeave + 20))
      });

      // Sample Workload Records (last 4 weeks)
      for (let w = 1; w <= 4; w++) {
        this.workloads.push({
          workloadId: `WL-${1000 + i}-${w}`,
          personnelId: pid,
          dutyHours: Math.round(currentDutyHoursWeekly - (w * 1.5) + (i % 3)),
          nightShifts: Math.max(0, Math.round(nightDutyCountLastMonth / 4)),
          trainingHours: 8,
          deploymentDays: Math.min(deploymentDurationDays, 7 * w),
          weekNumber: 38 - w,
          year: 2026,
          recordedAt: new Date(Date.now() - 1000 * 3600 * 24 * 7 * w)
        });
      }

      // Sample Assessments (past 3 months)
      this.assessments.push({
        assessmentId: `ASM-${1000 + i}-1`,
        personnelId: pid,
        stressLevel: Math.round(stressScoreAvg),
        sleepQuality: Math.round(sleepQualityAvg),
        workloadLevel: Math.min(10, Math.round(currentDutyHoursWeekly / 8)),
        emotionalFatigue: Math.round(emotionalFatigueAvg),
        teamSupport: Math.round(teamSupportScore),
        supportRequested: evalResult.category === 'Elevated Support',
        supportNotes: evalResult.category === 'Elevated Support' ? 'Requested counseling check-in due to sleep disturbance.' : '',
        calculatedIndicator: evalResult.supportIndicator,
        calculatedCategory: evalResult.category,
        createdAt: new Date(Date.now() - 1000 * 3600 * 24 * (3 + (i % 7)))
      });
    }

    // 4. Welfare Interventions (Pre-seeded cases with full status workflow)
    this.interventions = [
      {
        interventionId: 'INT-3001',
        personnelId: 'PF-1024',
        officerId: 'WO-2001',
        officerName: 'Dr. Meenakshi Sharma',
        interventionType: 'Workload Review',
        recommendation: 'Scheduled rotation from forward perimeter duty and priority 14-day leave window sanction.',
        notes: 'Subject exhibited fatigue secondary to 94-day continuous deployment. Unit commander notified for roster adjustment.',
        status: 'In Progress',
        followUpDate: new Date(Date.now() + 1000 * 3600 * 24 * 5),
        outcome: 'Shift hours reduced by 14h weekly; sleep duration improving.',
        createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 3),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 24 * 1)
      },
      {
        interventionId: 'INT-3002',
        personnelId: 'PF-1008',
        officerId: 'WO-2001',
        officerName: 'Dr. Meenakshi Sharma',
        interventionType: 'Counseling Referral',
        recommendation: 'Confidential peer counselor session regarding family welfare communication gap.',
        notes: 'Voluntary request initiated via portal; first session conducted satisfactorily.',
        status: 'Follow-up Required',
        followUpDate: new Date(Date.now() + 1000 * 3600 * 24 * 2),
        outcome: 'Follow-up consultation booked with base welfare counselor.',
        createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 7),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 24 * 2)
      },
      {
        interventionId: 'INT-3003',
        personnelId: 'PF-1016',
        officerId: 'WO-2001',
        officerName: 'Dr. Meenakshi Sharma',
        interventionType: 'Leave Planning',
        recommendation: 'Expedited compassionate leave granted for home visit.',
        notes: 'Personnel fulfilled arduous tenure. Sanctioned 15-day annual leave.',
        status: 'Completed',
        followUpDate: new Date(Date.now() - 1000 * 3600 * 24 * 1),
        outcome: 'Returned from sanctioned leave revitalized; stress indicator normalized to 32.',
        createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 25),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 24 * 1)
      },
      {
        interventionId: 'INT-3004',
        personnelId: 'PF-1032',
        officerId: 'WO-2001',
        officerName: 'Dr. Meenakshi Sharma',
        interventionType: 'Welfare Check-in',
        recommendation: 'Informal briefing and hydration/rest routine guidance with squad commander.',
        notes: 'Moderate indicator noted after night patrol cluster.',
        status: 'Support Planned',
        followUpDate: new Date(Date.now() + 1000 * 3600 * 24 * 4),
        outcome: 'Pending roster check-in',
        createdAt: new Date(Date.now() - 1000 * 3600 * 24 * 1),
        updatedAt: new Date(Date.now() - 1000 * 3600 * 24 * 1)
      }
    ];

    // 5. Automated Alerts
    this.alerts = [
      {
        alertId: 'ALT-101',
        unitId: 'UNIT-101',
        type: 'Workload Alert',
        title: 'Duty Hours Spurt: 101 Bn (Alpha)',
        message: 'Unit 101 Bn (Alpha) has experienced an increase of 14% in average duty hours over the previous reporting cycle.',
        severity: 'attention',
        targetRoles: ['welfare_officer', 'commander', 'admin'],
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 3600 * 5)
      },
      {
        alertId: 'ALT-102',
        unitId: 'UNIT-101',
        type: 'Welfare Follow-up',
        title: 'Confidential Support Requests Pending',
        message: '3 personnel in Sector J&K have voluntarily requested confidential welfare check-in consultations.',
        severity: 'warning',
        targetRoles: ['welfare_officer'],
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 3600 * 12)
      },
      {
        alertId: 'ALT-103',
        unitId: 'UNIT-102',
        type: 'Deployment Alert',
        title: 'Extended Deployment Pattern Detected',
        message: 'Forward detachments in 102 Bn (Bravo) have exceeded 85 consecutive deployment days. Rotation planning recommended.',
        severity: 'attention',
        targetRoles: ['welfare_officer', 'commander'],
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 3600 * 22)
      },
      {
        alertId: 'ALT-104',
        unitId: 'ALL',
        type: 'Leave Pattern',
        title: 'Overdue Leave Intervals in Frontier Units',
        message: '14 personnel have surpassed 75 days since sanctioned leave. Unit-level welfare review advised.',
        severity: 'info',
        targetRoles: ['welfare_officer', 'commander', 'admin'],
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 3600 * 48)
      }
    ];

    // 6. Audit Logs
    this.auditLogs = [
      {
        logId: 'AUD-9001',
        userId: 'WO-2001',
        userName: 'Dr. Meenakshi Sharma',
        role: 'welfare_officer',
        action: 'VIEW_PERSONNEL_WELFARE_RECORD',
        resource: 'Personnel PF-1024',
        details: 'Authorized review of contributing factors and support indicator',
        ipAddress: '10.24.8.12 (Intranet CRPF)',
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 1000 * 3600 * 2)
      },
      {
        logId: 'AUD-9002',
        userId: 'PF-1024',
        userName: 'Rajesh Kumar',
        role: 'personnel',
        action: 'SUBMIT_WELLNESS_ASSESSMENT',
        resource: 'Assessment Form ASM-1024',
        details: 'Voluntary wellness check-in completed by personnel',
        ipAddress: '10.24.8.45 (Field Unit Alpha)',
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 1000 * 3600 * 6)
      },
      {
        logId: 'AUD-9003',
        userId: 'CMD-3001',
        userName: 'Commandant Arvind Singhal',
        role: 'commander',
        action: 'VIEW_UNIT_AGGREGATED_ANALYTICS',
        resource: 'Sector J&K / Central Overview',
        details: 'Accessed anonymized workforce wellness and leave distribution trends',
        ipAddress: '10.24.2.1 (Sector Command HQ)',
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 1000 * 3600 * 14)
      },
      {
        logId: 'AUD-9004',
        userId: 'ADM-4001',
        userName: 'Suresh Menon',
        role: 'admin',
        action: 'UPDATE_SECURITY_CONFIG',
        resource: 'Role-Based Access Control Policies',
        details: 'Verified role boundaries for Commander and Welfare Officer levels',
        ipAddress: '10.24.0.5 (Directorate IT)',
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 1000 * 3600 * 24)
      }
    ];

    this.initialized = true;
    console.log('[DataStore] Successfully seeded:');
    console.log(` - ${this.users.length} Users`);
    console.log(` - ${this.personnel.length} Personnel Profiles`);
    console.log(` - ${this.riskAssessments.length} AI Risk Assessments`);
    console.log(` - ${this.interventions.length} Welfare Interventions`);
    console.log(` - ${this.alerts.length} Automated Alerts`);
    console.log(` - ${this.auditLogs.length} Audit Log entries`);
  }

  // Helper audit logger
  logAudit(userId, userName, role, action, resource, details, status = 'SUCCESS') {
    const entry = {
      logId: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      userName: userName || 'Authorized User',
      role,
      action,
      resource,
      details,
      ipAddress: '10.24.8.12 (Intranet CRPF)',
      status,
      timestamp: new Date()
    };
    this.auditLogs.unshift(entry);
    if (this.auditLogs.length > 500) this.auditLogs.pop();
    return entry;
  }
}

export const dataStore = new DataStore();
