import express from 'express';
import { submitAssessment, getAssessmentHistory, getPersonnelAssessments } from '../controllers/wellnessController.js';
import { authenticateUser, authorizeRole, checkDataAccess } from '../middleware/auth.js';

const router = express.Router();

router.post('/assessment', authenticateUser, submitAssessment);
router.get('/history', authenticateUser, getAssessmentHistory);
router.get('/:personnelId', authenticateUser, checkDataAccess, authorizeRole('welfare_officer', 'admin'), getPersonnelAssessments);

export default router;
