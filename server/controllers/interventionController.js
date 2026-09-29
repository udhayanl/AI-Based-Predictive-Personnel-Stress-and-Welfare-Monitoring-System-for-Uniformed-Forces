import { dataStore } from '../utils/dataStore.js';

export const createIntervention = async (req, res, next) => {
  try {
    const {
      personnelId,
      interventionType,
      recommendation,
      notes,
      followUpDate,
      status = 'New'
    } = req.body;

    if (!personnelId || !interventionType || !recommendation) {
      return res.status(400).json({
        success: false,
        message: 'Personnel ID, intervention type, and recommendation are required.'
      });
    }

    const personnel = dataStore.personnel.find(p => p.personnelId === personnelId);
    if (!personnel) {
      return res.status(404).json({
        success: false,
        message: `Personnel record ${personnelId} not found.`
      });
    }

    const newIntervention = {
      interventionId: `INT-${Date.now()}`,
      personnelId,
      officerId: req.user.userId,
      officerName: req.user.name || 'Welfare Officer',
      interventionType,
      recommendation,
      notes: notes || '',
      status,
      followUpDate: followUpDate ? new Date(followUpDate) : new Date(Date.now() + 1000 * 3600 * 24 * 7),
      outcome: 'Welfare plan formulated; pending personnel engagement',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    dataStore.interventions.unshift(newIntervention);

    dataStore.logAudit(
      req.user.userId,
      req.user.name,
      req.user.role,
      'CREATE_WELFARE_INTERVENTION',
      `Target: ${personnelId} (${interventionType})`,
      recommendation,
      'SUCCESS'
    );

    return res.status(201).json({
      success: true,
      message: 'Welfare intervention registered successfully.',
      data: newIntervention
    });
  } catch (error) {
    next(error);
  }
};

export const getInterventions = async (req, res, next) => {
  try {
    const { status, type, personnelId } = req.query;
    let list = [...dataStore.interventions];

    if (personnelId) {
      list = list.filter(i => i.personnelId === personnelId);
    }
    if (status && status !== 'ALL') {
      list = list.filter(i => i.status === status);
    }
    if (type && type !== 'ALL') {
      list = list.filter(i => i.interventionType === type);
    }

    // Enrich with personnel info
    const enriched = list.map(item => {
      const p = dataStore.personnel.find(person => person.personnelId === item.personnelId);
      return {
        ...item,
        personnelName: p ? p.name : 'Unknown Personnel',
        unitName: p ? p.unitName : 'N/A',
        rank: p ? p.designation : 'N/A'
      };
    });

    return res.status(200).json({
      success: true,
      count: enriched.length,
      data: enriched
    });
  } catch (error) {
    next(error);
  }
};

export const updateIntervention = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, outcome, notes, followUpDate } = req.body;

    const index = dataStore.interventions.findIndex(i => i.interventionId === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Intervention ${id} not found.`
      });
    }

    const current = dataStore.interventions[index];
    const updated = {
      ...current,
      ...(status && { status }),
      ...(outcome && { outcome }),
      ...(notes && { notes }),
      ...(followUpDate && { followUpDate: new Date(followUpDate) }),
      updatedAt: new Date()
    };

    dataStore.interventions[index] = updated;

    dataStore.logAudit(
      req.user.userId,
      req.user.name,
      req.user.role,
      'UPDATE_WELFARE_INTERVENTION',
      `Intervention ID: ${id}`,
      `Status changed to: ${status || current.status}`,
      'SUCCESS'
    );

    return res.status(200).json({
      success: true,
      message: 'Intervention updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};
