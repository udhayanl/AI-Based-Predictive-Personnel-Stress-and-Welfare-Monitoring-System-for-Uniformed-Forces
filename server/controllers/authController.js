import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { dataStore } from '../utils/dataStore.js';

export const login = async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Service/Employee ID and password.'
      });
    }

    const user = dataStore.users.find(
      u => u.userId.toLowerCase() === userId.trim().toLowerCase() ||
           u.email.toLowerCase() === userId.trim().toLowerCase()
    );

    if (!user) {
      dataStore.logAudit(
        userId,
        'Unknown User',
        'anonymous',
        'AUTH_LOGIN_FAILED',
        '/api/auth/login',
        'User identifier not found',
        'FAILURE'
      );
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your Service ID.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      dataStore.logAudit(
        user.userId,
        user.name,
        user.role,
        'AUTH_LOGIN_FAILED',
        '/api/auth/login',
        'Incorrect password entered',
        'FAILURE'
      );
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password does not match.'
      });
    }

    // Generate JWT
    const secret = process.env.JWT_SECRET || 'crpf_sih26186_personnel_welfare_jwt_secure_key_2026';
    const token = jwt.sign(
      {
        userId: user.userId,
        role: user.role,
        unitId: user.unitId
      },
      secret,
      { expiresIn: '8h' }
    );

    user.lastLogin = new Date();

    dataStore.logAudit(
      user.userId,
      user.name,
      user.role,
      'AUTH_LOGIN_SUCCESS',
      '/api/auth/login',
      `Successful login as ${user.role}`,
      'SUCCESS'
    );

    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      data: {
        token,
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
          role: user.role,
          rank: user.rank,
          unitId: user.unitId,
          permissions: user.permissions,
          consentStatus: user.consentStatus
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = dataStore.users.find(u => u.userId === req.user.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
          role: user.role,
          rank: user.rank,
          unitId: user.unitId,
          permissions: user.permissions,
          consentStatus: user.consentStatus
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    if (req.user) {
      dataStore.logAudit(
        req.user.userId,
        req.user.name,
        req.user.role,
        'AUTH_LOGOUT',
        '/api/auth/logout',
        'User logged out voluntarily',
        'SUCCESS'
      );
    }
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.'
    });
  } catch (error) {
    next(error);
  }
};
