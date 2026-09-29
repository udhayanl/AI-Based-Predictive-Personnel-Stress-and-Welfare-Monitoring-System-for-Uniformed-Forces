import jwt from 'jsonwebtoken';
import { dataStore } from '../utils/dataStore.js';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required to access this resource.'
    });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET || 'crpf_sih26186_personnel_welfare_jwt_secure_key_2026';

  try {
    const decoded = jwt.verify(token, secret);
    const user = dataStore.users.find(u => u.userId === decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session. User account not found.'
      });
    }

    req.user = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      rank: user.rank,
      unitId: user.unitId,
      permissions: user.permissions,
      consentStatus: user.consentStatus
    };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Session has expired or token is invalid. Please log in again.'
    });
  }
};

export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      // Audit log unauthorized attempt
      dataStore.logAudit(
        req.user.userId,
        req.user.name,
        req.user.role,
        'UNAUTHORIZED_ACCESS_ATTEMPT',
        req.originalUrl,
        `Attempted role ${req.user.role} on restricted route`,
        'DENIED'
      );

      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' is not authorized for this action.`
      });
    }

    next();
  };
};

export const checkDataAccess = (req, res, next) => {
  const { personnelId } = req.params;
  const { role, userId } = req.user;

  // Personnel can strictly view their own profile/records
  if (role === 'personnel' && personnelId && personnelId !== userId) {
    dataStore.logAudit(
      userId,
      req.user.name,
      role,
      'CROSS_PERSONNEL_DATA_ACCESS_DENIED',
      `Target: ${personnelId}`,
      'Personnel attempted to view another personnel record',
      'DENIED'
    );
    return res.status(403).json({
      success: false,
      message: 'Privacy violation: Personnel are strictly restricted to their own wellness data.'
    });
  }

  // Commander can NOT view individual private clinical assessment responses unless explicitly aggregated
  if (role === 'commander' && req.path.includes('/assessment/')) {
    dataStore.logAudit(
      userId,
      req.user.name,
      role,
      'COMMANDER_RAW_WELLNESS_ACCESS_DENIED',
      req.originalUrl,
      'Commanders are restricted to aggregated organizational trends for privacy preservation',
      'DENIED'
    );
    return res.status(403).json({
      success: false,
      message: 'Commanders access aggregated organization trends. Individual raw wellness records are restricted to Welfare Officers.'
    });
  }

  next();
};

export const auditSensitiveAccess = (action, resourceName) => {
  return (req, res, next) => {
    if (req.user) {
      dataStore.logAudit(
        req.user.userId,
        req.user.name,
        req.user.role,
        action,
        resourceName || req.originalUrl,
        `HTTP ${req.method} on ${req.originalUrl}`,
        'SUCCESS'
      );
    }
    next();
  };
};
