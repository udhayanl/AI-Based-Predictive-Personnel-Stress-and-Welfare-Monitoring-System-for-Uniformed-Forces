import express from 'express';
import { analyzeRisk, getPersonnelRisk, getRiskDashboard, getModelAnalytics } from '../controllers/riskController.js';
import { authenticateUser, authorizeRole, checkDataAccess } from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', authenticateUser, analyzeRisk);
router.get('/dashboard', authenticateUser, authorizeRole('welfare_officer', 'commander', 'admin'), getRiskDashboard);
router.get('/model-analytics', authenticateUser, getModelAnalytics);
router.get('/:personnelId', authenticateUser, checkDataAccess, getPersonnelRisk);

export default router;
