import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { getRecentHistory } from '../controllers/transactionController.js'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection to all dashboard routes
router.use(protect);

// Route for top-level cards (Total Sales, Users, etc.)
router.get('/stats', getDashboardStats);

// Route for the "Recent Orders/History" table
router.get('/history', getRecentHistory);

export default router;