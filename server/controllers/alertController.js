import { dataStore } from '../utils/dataStore.js';

export const getAlerts = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    // Filter alerts applicable to user's role
    const alerts = dataStore.alerts.filter(
      a => !a.targetRoles || a.targetRoles.length === 0 || a.targetRoles.includes(userRole)
    );

    return res.status(200).json({
      success: true,
      count: alerts.length,
      unreadCount: alerts.filter(a => !a.isRead).length,
      data: alerts
    });
  } catch (error) {
    next(error);
  }
};

export const markAlertAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const alert = dataStore.alerts.find(a => a.alertId === id);

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found.'
      });
    }

    alert.isRead = true;

    return res.status(200).json({
      success: true,
      message: 'Alert marked as read.',
      data: alert
    });
  } catch (error) {
    next(error);
  }
};
