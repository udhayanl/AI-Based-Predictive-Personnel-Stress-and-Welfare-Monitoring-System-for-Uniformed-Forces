import express from 'express';
import { getLeaves, getPersonnelLeave, createLeave } from '../controllers/leaveController.js';
import { authenticateUser, authorizeRole, checkDataAccess } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, getLeaves);
router.get('/:personnelId', authenticateUser, checkDataAccess, getPersonnelLeave);
router.post('/', authenticateUser, authorizeRole('welfare_officer', 'commander', 'admin'), createLeave);

export default router;
