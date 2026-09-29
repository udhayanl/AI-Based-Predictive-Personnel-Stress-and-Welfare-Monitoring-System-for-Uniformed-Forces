import express from 'express';
import { getWorkloads, getPersonnelWorkload, createWorkload } from '../controllers/workloadController.js';
import { authenticateUser, authorizeRole, checkDataAccess } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, getWorkloads);
router.get('/:personnelId', authenticateUser, checkDataAccess, getPersonnelWorkload);
router.post('/', authenticateUser, authorizeRole('welfare_officer', 'commander', 'admin'), createWorkload);

export default router;
