import { dataStore } from '../utils/dataStore.js';

export const getLeaves = async (req, res, next) => {
  try {
    const { personnelId } = req.query;
    let list = [...dataStore.leaves];

    if (personnelId) {
      list = list.filter(l => l.personnelId === personnelId);
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

export const getPersonnelLeave = async (req, res, next) => {
  try {
    const { personnelId } = req.params;
    const list = dataStore.leaves.filter(l => l.personnelId === personnelId);

    return res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

export const createLeave = async (req, res, next) => {
  try {
    const { personnelId, leaveType = 'Annual Leave', startDate, endDate, durationDays, reason } = req.body;

    if (!personnelId || !startDate || !endDate || !durationDays) {
      return res.status(400).json({
        success: false,
        message: 'Personnel ID, start date, end date, and duration days are required.'
      });
    }

    const record = {
      leaveId: `LV-${Date.now()}`,
      personnelId,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      durationDays: Number(durationDays),
      status: 'Approved',
      reason: reason || 'Rest and recuperation cycle',
      createdAt: new Date()
    };

    dataStore.leaves.unshift(record);

    // Reset personnel daysSinceLastLeave if leave ends today or recently
    const p = dataStore.personnel.find(item => item.personnelId === personnelId);
    if (p) {
      p.daysSinceLastLeave = 0;
      p.updatedAt = new Date();
    }

    return res.status(201).json({
      success: true,
      message: 'Leave record recorded successfully.',
      data: record
    });
  } catch (error) {
    next(error);
  }
};
