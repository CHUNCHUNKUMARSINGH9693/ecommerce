import express from 'express';
import { 
    getMyRewards, 
    getRewardHistory 
} from '../controllers/rewardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection to all reward routes at once
// This prevents unauthorized access when clicking the rewards page
router.use(protect);

// @route   GET /api/v1/rewards/my-balance
// Triggered when the dashboard or rewards page loads to show current points
router.get('/my-balance', getMyRewards);

// @route   GET /api/v1/rewards/history
// Triggered when a user clicks to view their point transaction history
router.get('/history', getRewardHistory);

export default router;