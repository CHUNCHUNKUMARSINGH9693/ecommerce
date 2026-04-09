import express from 'express';
import { getMyRewards, getRewardHistory } from '../controllers/rewardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/balance', protect, getMyRewards);
router.get('/history', protect, getRewardHistory);

export default router;