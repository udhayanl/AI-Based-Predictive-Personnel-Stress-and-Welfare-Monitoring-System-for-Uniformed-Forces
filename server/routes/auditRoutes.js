import express from 'express';
import { getAuditLogs } from '../controllers/auditController.js';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateUser, authorizeRole('admin'), getAuditLogs);

export default router;
