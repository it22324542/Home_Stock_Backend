import express from 'express';
import { getLoginLogs, deleteLoginLogsByDateRange } from '../controllers/loginLogController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get login logs for the authenticated user
router.get('/', auth, getLoginLogs);

// Delete login logs within a date range
router.delete('/date-range', auth, deleteLoginLogsByDateRange);

export default router; 