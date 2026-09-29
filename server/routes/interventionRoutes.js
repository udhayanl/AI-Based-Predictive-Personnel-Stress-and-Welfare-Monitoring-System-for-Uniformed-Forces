import express from 'express';
import { createIntervention, getInterventions, updateIntervention } from '../controllers/interventionController.js';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateUser, authorizeRole('welfare_officer', 'admin'), createIntervention);
router.get('/', authenticateUser, getInterventions);
router.put('/:id', authenticateUser, authorizeRole('welfare_officer', 'admin'), updateIntervention);

export default router;
