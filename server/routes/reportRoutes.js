import express from 'express';
import { getRecentHistory } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetches the data for the "Recent History" table on the dashboard
router.get('/history', protect, getRecentHistory);

export default router;