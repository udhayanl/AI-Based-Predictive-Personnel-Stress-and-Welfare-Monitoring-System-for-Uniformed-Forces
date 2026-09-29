import express from 'express';
import { login, logout, getCurrentUser } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', authenticateUser, logout);
router.get('/me', authenticateUser, getCurrentUser);

export default router;
