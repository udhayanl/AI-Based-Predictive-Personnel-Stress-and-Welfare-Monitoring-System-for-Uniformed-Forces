import { dataStore } from '../utils/dataStore.js';

export const getOverviewAnalytics = async (req, res, next) => {
  try {
    const totalPersonnel = dataStore.personnel.length;
    const totalAssessments = dataStore.assessments.length;
    const activeInterventions = dataStore.interventions.filter(i => i.status !== 'Completed').length;
    const supportRequests = dataStore.assessments.filter(a => a.supportRequested).length;
    
    // Average Support Indicator
    const avgIndicator = Math.round(
      dataStore.riskAssessments.reduce((acc, r) => acc + r.supportIndicator, 0) / (totalPersonnel || 1)
    );

    // Average Duty Hours
    const avgDutyHours = Math.round(
      dataStore.personnel.reduce((acc, p) => acc + p.currentDutyHoursWeekly, 0) / (totalPersonnel || 1)
    );

    // Active Deployments (>30 days continuous)
    const activeDeployments = dataStore.personnel.filter(p => p.deploymentDurationDays >= 30).length;

    // Personnel Requiring Follow-up (Elevated or voluntarily requested support)
    const followUpRequired = dataStore.riskAssessments.filter(r => r.supportIndicator >= 65).length;

    // Support indicator breakdown
    const stableCount = dataStore.riskAssessments.filter(r => r.supportIndicator < 40).length;
    const monitorCount = dataStore.riskAssessments.filter(r => r.supportIndicator >= 40 && r.supportIndicator < 65).length;
    const elevatedCount = dataStore.riskAssessments.filter(r => r.supportIndicator >= 65).length;

    // Unit-by-unit Aggregation
    const unitMetrics = dataStore.units.map(unit => {
      const unitPersonnel = dataStore.personnel.filter(p => p.unitId === unit.unitId);
      const count = unitPersonnel.length || 1;
      const unitRisks = unitPersonnel.map(p => dataStore.riskAssessments.find(r => r.personnelId === p.personnelId)?.supportIndicator || 35);
      const unitAvgIndicator = Math.round(unitRisks.reduce((a, b) => a + b, 0) / count);
      const unitAvgDuty = Math.round(unitPersonnel.reduce((a, p) => a + p.currentDutyHoursWeekly, 0) / count);
      const unitElevated = unitRisks.filter(s => s >= 65).length;
      const unitActiveDeploy = unitPersonnel.filter(p => p.deploymentDurationDays >= 45).length;

      return {
        unitId: unit.unitId,
        unitName: unit.unitName,
        sector: unit.sector,
        personnelCount: unitPersonnel.length,
        averageIndicator: unitAvgIndicator,
        averageDutyHours: unitAvgDuty,
        elevatedCount: unitElevated,
        activeDeployments: unitActiveDeploy,
        status: unitAvgIndicator < 45 ? 'Normal' : unitAvgIndicator < 55 ? 'Moderate Watch' : 'Attention Required'
      };
    });

    // 30-day Trend Simulation (Aggregated across force)
    const trend30Days = [];
    const now = Date.now();
    for (let day = 30; day >= 0; day -= 3) {
      const dateStr = new Date(now - day * 24 * 3600 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      trend30Days.push({
        date: dateStr,
        averageWellnessIndex: 74 - Math.round(Math.sin(day / 3) * 6),
        averageWorkloadHours: 51 + Math.round(Math.cos(day / 4) * 4),
        supportIndicator: 44 + Math.round(Math.sin(day / 5) * 5),
        completedAssessments: 12 + Math.round(Math.random() * 8)
      });
    }

    // Deployment vs Wellness Distribution
    const deploymentScatter = dataStore.personnel.slice(0, 40).map(p => {
      const risk = dataStore.riskAssessments.find(r => r.personnelId === p.personnelId);
      return {
        id: req.user.role === 'commander' ? p.anonymizedCode : p.personnelId,
        deploymentDays: p.deploymentDurationDays,
        supportIndicator: risk ? risk.supportIndicator : 35,
        dutyHours: p.currentDutyHoursWeekly,
        unit: p.unitName
      };
    });

    // Leave Pattern / Gap Distribution
    const leaveGapBins = [
      { range: '< 30 days', count: dataStore.personnel.filter(p => p.daysSinceLastLeave < 30).length, label: 'Recent Rest' },
      { range: '30 - 60 days', count: dataStore.personnel.filter(p => p.daysSinceLastLeave >= 30 && p.daysSinceLastLeave <= 60).length, label: 'Standard Cadence' },
      { range: '61 - 90 days', count: dataStore.personnel.filter(p => p.daysSinceLastLeave > 60 && p.daysSinceLastLeave <= 90).length, label: 'Due for Leave' },
      { range: '> 90 days', count: dataStore.personnel.filter(p => p.daysSinceLastLeave > 90).length, label: 'Extended Interval' }
    ];

    return res.status(200).json({
      success: true,
      data: {
        kpis: {
          totalPersonnel,
          activeDeployments,
          averageDutyHours: avgDutyHours,
          avgIndicator,
          totalAssessments,
          followUpRequired,
          activeInterventions,
          supportRequests
        },
        distribution: [
          { name: 'Stable', count: stableCount, value: stableCount, color: '#10b981' },
          { name: 'Monitor', count: monitorCount, value: monitorCount, color: '#f59e0b' },
          { name: 'Support Recommended', count: elevatedCount, value: elevatedCount, color: '#f97316' }
        ],
        unitMetrics,
        trend30Days,
        deploymentScatter,
        leaveGapBins
      }
    });
  } catch (error) {
    next(error);
  }
};
