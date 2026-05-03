import express from 'express';
// FIX: Import the functions that actually exist in your reportController
import { createReport, getMyReports } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Secure all reporting routes
router.use(protect);

// @route   POST /api/v1/reports
// Triggered when a user clicks "Submit" on a report or support form
router.post('/', createReport);

// @route   GET /api/v1/reports/my-reports
// Triggered when a user clicks to view their previous support history
router.get('/my-reports', getMyReports);

export default router;