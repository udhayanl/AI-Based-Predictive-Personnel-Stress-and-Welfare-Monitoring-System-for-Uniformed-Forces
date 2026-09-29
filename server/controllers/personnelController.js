import { dataStore } from '../utils/dataStore.js';

export const getOwnProfile = async (req, res, next) => {
  try {
    const personnel = dataStore.personnel.find(p => p.personnelId === req.user.userId);
    if (!personnel) {
      return res.status(404).json({
        success: false,
        message: 'Personnel profile record not found.'
      });
    }

    const consent = dataStore.consents.find(c => c.personnelId === req.user.userId);
    const risk = dataStore.riskAssessments.find(r => r.personnelId === req.user.userId);
    const recentWorkload = dataStore.workloads.filter(w => w.personnelId === req.user.userId).slice(0, 4);
    const recentLeaves = dataStore.leaves.filter(l => l.personnelId === req.user.userId);

    return res.status(200).json({
      success: true,
      data: {
        profile: personnel,
        consent,
        currentRisk: risk,
        recentWorkload,
        recentLeaves
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPersonnelList = async (req, res, next) => {
  try {
    const { unitId, category, workload, search, minDeployment, maxDeployment } = req.query;
    let list = [...dataStore.personnel];

    // Filter by unit
    if (unitId && unitId !== 'ALL') {
      list = list.filter(p => p.unitId === unitId);
    }

    // Attach latest risk indicator
    list = list.map(p => {
      const risk = dataStore.riskAssessments.find(r => r.personnelId === p.personnelId);
      const isElevated = risk ? risk.supportIndicator >= 65 : false;
      const isModerate = risk ? risk.supportIndicator >= 40 && risk.supportIndicator < 65 : false;

      let status = 'Stable';
      if (isElevated) status = 'Support Recommended';
      else if (isModerate) status = 'Monitor';

      return {
        ...p,
        supportIndicator: risk ? risk.supportIndicator : 30,
        category: risk ? risk.category : 'Stable',
        status,
        recommendedAction: risk?.recommendedActions?.[0] || 'Routine welfare monitoring',
        // Privacy preservation for Commanders: Mask name if user is Commander
        displayName: req.user.role === 'commander' ? p.anonymizedCode : p.name
      };
    });

    // Filter by category
    if (category && category !== 'ALL') {
      list = list.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    // Filter by workload
    if (workload && workload !== 'ALL') {
      if (workload === 'High') {
        list = list.filter(p => p.currentDutyHoursWeekly >= 60);
      } else if (workload === 'Moderate') {
        list = list.filter(p => p.currentDutyHoursWeekly >= 48 && p.currentDutyHoursWeekly < 60);
      } else if (workload === 'Low') {
        list = list.filter(p => p.currentDutyHoursWeekly < 48);
      }
    }

    // Filter by deployment days
    if (minDeployment) {
      list = list.filter(p => p.deploymentDurationDays >= Number(minDeployment));
    }
    if (maxDeployment) {
      list = list.filter(p => p.deploymentDurationDays <= Number(maxDeployment));
    }

    // Search query
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => 
        p.personnelId.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.unitName.toLowerCase().includes(q) ||
        p.designation.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

export const getPersonnelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const personnel = dataStore.personnel.find(p => p.personnelId === id);

    if (!personnel) {
      return res.status(404).json({
        success: false,
        message: `Personnel record ${id} not found.`
      });
    }

    const risk = dataStore.riskAssessments.find(r => r.personnelId === id);
    const workloads = dataStore.workloads.filter(w => w.personnelId === id);
    const leaves = dataStore.leaves.filter(l => l.personnelId === id);
    const assessments = dataStore.assessments.filter(a => a.personnelId === id);
    const interventions = dataStore.interventions.filter(i => i.personnelId === id);
    const consent = dataStore.consents.find(c => c.personnelId === id);

    dataStore.logAudit(
      req.user.userId,
      req.user.name,
      req.user.role,
      'VIEW_PERSONNEL_DETAIL',
      `Personnel ID: ${id}`,
      `Authorized welfare inspection by ${req.user.role}`,
      'SUCCESS'
    );

    return res.status(200).json({
      success: true,
      data: {
        profile: personnel,
        risk,
        workloads,
        leaves,
        assessments,
        interventions,
        consent
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updatePersonnel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = dataStore.personnel.findIndex(p => p.personnelId === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Personnel ${id} not found.`
      });
    }

    const updated = {
      ...dataStore.personnel[index],
      ...req.body,
      updatedAt: new Date()
    };
    dataStore.personnel[index] = updated;

    dataStore.logAudit(
      req.user.userId,
      req.user.name,
      req.user.role,
      'UPDATE_PERSONNEL_RECORD',
      `Personnel ID: ${id}`,
      'Updated profile parameters',
      'SUCCESS'
    );

    return res.status(200).json({
      success: true,
      message: 'Personnel record updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
