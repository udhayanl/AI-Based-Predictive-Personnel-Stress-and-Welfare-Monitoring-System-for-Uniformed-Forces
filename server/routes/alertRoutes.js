import express from 'express';
import { getAlerts, markAlertAsRead } from '../controllers/alertController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, getAlerts);
router.put('/:id/read', authenticateUser, markAlertAsRead);

export default router;
