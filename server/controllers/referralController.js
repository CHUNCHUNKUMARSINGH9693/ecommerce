import Referral from '../models/Referral.js';
import User from '../models/User.js';

// @desc    Get user's referral stats and list of referred users
// @route   GET /api/v1/referrals/my-network
export const getReferralStats = async (req, res) => {
    try {
        // Fetch the user to get their personal referral code
        const user = await User.findById(req.user._id);

        // Find all people this user has invited
        const referrals = await Referral.find({ referrer: req.user._id })
            .populate('referredUser', 'name email createdAt') 
            .sort({ createdAt: -1 });

        // Calculate stats for the Referral Dashboard cards
        const totalReferrals = referrals.length;
        const successfulReferrals = referrals.filter(ref => ref.status === 'Completed').length;
        
        // Example logic: $50 reward per successful referral
        const totalEarnings = successfulReferrals * 50; 

        res.status(200).json({
            success: true,
            data: {
                referralCode: user.referralCode || "NOT_GENERATED",
                stats: {
                    totalReferrals,
                    successfulReferrals,
                    pendingReferrals: totalReferrals - successfulReferrals,
                    totalEarnings
                },
                recentHistory: referrals.map((ref) => ({
                    id: ref._id,
                    status: ref.status,
                    rewardDistributed: ref.rewardDistributed,
                    createdAt: ref.createdAt,
                    referredUser: ref.referredUser
                        ? {
                            id: ref.referredUser._id,
                            name: ref.referredUser.name,
                            email: ref.referredUser.email
                        }
                        : null
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Generate a unique referral code
// @route   POST /api/v1/referrals/generate
export const generateReferralCode = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        
        if (user.referralCode) {
            return res.status(400).json({ message: 'Referral code already exists' });
        }

        // Professional format: UK + 6 random alphanumeric characters
        const uniqueCode = `UK${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        user.referralCode = uniqueCode;
        await user.save();

        res.status(201).json({ success: true, referralCode: uniqueCode });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};