import express from 'express';
import { getOverviewAnalytics } from '../controllers/analyticsController.js';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/overview', authenticateUser, authorizeRole('welfare_officer', 'commander', 'admin'), getOverviewAnalytics);

export default router;
