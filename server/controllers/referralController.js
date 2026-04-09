import Referral from '../models/Referral.js';
import User from '../models/User.js';

// @desc    Get user's referral stats and list of referred users
// @route   GET /api/v1/referrals/my-network
// @access  Private
export const getReferralStats = async (req, res) => {
    try {
        // Find all referrals where the current user is the referrer
        const referrals = await Referral.find({ referrer: req.user._id })
            .populate('referredUser', 'name email createdAt') // Get details of people invited
            .sort({ createdAt: -1 });

        const user = await User.findById(req.user._id);

        res.status(200).json({
            referralCode: user.myReferralCode,
            totalReferrals: referrals.length,
            successfulReferrals: referrals.filter(ref => ref.status === 'Completed').length,
            network: referrals
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Generate/Refresh referral code (if not created during signup)
// @route   POST /api/v1/referrals/generate
// @access  Private
export const generateReferralCode = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (user.myReferralCode) {
            return res.status(400).json({ message: 'Referral code already exists' });
        }

        // Logic to create a unique code (e.g., UTKARSH123)
        const uniqueCode = `UK${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        user.myReferralCode = uniqueCode;
        await user.save();

        res.status(201).json({ referralCode: uniqueCode });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};