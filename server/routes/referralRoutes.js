import express from 'express';
import { getReferralStats, generateReferralCode } from '../controllers/referralController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-network', protect, getReferralStats);
router.post('/generate', protect, generateReferralCode);

export default router;