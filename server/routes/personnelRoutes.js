import express from 'express';
import { getOwnProfile, getPersonnelList, getPersonnelById, updatePersonnel } from '../controllers/personnelController.js';
import { authenticateUser, authorizeRole, checkDataAccess } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticateUser, getOwnProfile);
router.get('/', authenticateUser, authorizeRole('welfare_officer', 'commander', 'admin'), getPersonnelList);
router.get('/:id', authenticateUser, checkDataAccess, getPersonnelById);
router.put('/:id', authenticateUser, authorizeRole('welfare_officer', 'admin'), updatePersonnel);

export default router;
