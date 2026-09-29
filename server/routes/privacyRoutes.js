import express from 'express';
import { getConsentSettings, updateConsentSettings } from '../controllers/privacyController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.get('/consent', authenticateUser, getConsentSettings);
router.put('/consent', authenticateUser, updateConsentSettings);

export default router;
