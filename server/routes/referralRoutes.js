import express from 'express';
import { 
    getReferralStats, 
    generateReferralCode 
} from '../controllers/referralController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection to all referral routes
// No one can access network stats or generate codes without being logged in
router.use(protect);

// @route   GET /api/v1/referrals/my-network
// Triggered when a user clicks the "Refer & Earn" page to see their stats
router.get('/my-network', getReferralStats);
router.get('/', getReferralStats);

// @route   POST /api/v1/referrals/generate
// Triggered when a user clicks the "Generate Code" button in the UI
router.post('/generate', generateReferralCode);

export default router;