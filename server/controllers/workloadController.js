import { dataStore } from '../utils/dataStore.js';

export const getWorkloads = async (req, res, next) => {
  try {
    const { personnelId } = req.query;
    let list = [...dataStore.workloads];

    if (personnelId) {
      list = list.filter(w => w.personnelId === personnelId);
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

export const getPersonnelWorkload = async (req, res, next) => {
  try {
    const { personnelId } = req.params;
    const list = dataStore.workloads.filter(w => w.personnelId === personnelId);

    return res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

export const createWorkload = async (req, res, next) => {
  try {
    const { personnelId, dutyHours, nightShifts = 0, trainingHours = 0, deploymentDays = 0 } = req.body;

    if (!personnelId || !dutyHours) {
      return res.status(400).json({
        success: false,
        message: 'Personnel ID and duty hours are required.'
      });
    }

    const record = {
      workloadId: `WL-${Date.now()}`,
      personnelId,
      dutyHours: Number(dutyHours),
      nightShifts: Number(nightShifts),
      trainingHours: Number(trainingHours),
      deploymentDays: Number(deploymentDays),
      recordedAt: new Date()
    };

    dataStore.workloads.unshift(record);

    // Update personnel profile's current duty hours
    const p = dataStore.personnel.find(item => item.personnelId === personnelId);
    if (p) {
      p.currentDutyHoursWeekly = Number(dutyHours);
      p.nightDutyCountLastMonth += Number(nightShifts);
      p.updatedAt = new Date();
    }

    return res.status(201).json({
      success: true,
      message: 'Workload record saved successfully.',
      data: record
    });
  } catch (error) {
    next(error);
  }
};
