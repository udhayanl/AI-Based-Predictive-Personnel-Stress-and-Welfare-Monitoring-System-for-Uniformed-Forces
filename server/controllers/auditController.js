import { dataStore } from '../utils/dataStore.js';

export const getAuditLogs = async (req, res, next) => {
  try {
    const { role, action, status, search, limit = 100 } = req.query;
    let list = [...dataStore.auditLogs];

    if (role && role !== 'ALL') {
      list = list.filter(l => l.role === role);
    }
    if (action && action !== 'ALL') {
      list = list.filter(l => l.action.includes(action));
    }
    if (status && status !== 'ALL') {
      list = list.filter(l => l.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(l => 
        l.userId.toLowerCase().includes(q) ||
        l.userName.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q) ||
        l.resource.toLowerCase().includes(q) ||
        l.details.toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list.slice(0, Number(limit))
    });
  } catch (error) {
    next(error);
  }
};
