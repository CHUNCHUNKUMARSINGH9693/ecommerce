import Reward from '../models/Reward.js';
import Transaction from '../models/Transaction.js';
import { REWARD_TYPES, ERROR_MESSAGES } from '../utils/constants.js';

// @desc    Get current user reward balance and summary
// @route   GET /api/v1/rewards/my-balance
export const getMyRewards = async (req, res) => {
    try {
        const reward = await Reward.findOne({ user: req.user._id });

        // If no reward record exists, return a default "Zero" state
        if (!reward) {
            return res.status(200).json({
                success: true,
                points: 0,
                totalEarned: 0,
                pending: 0,
                tier: 'Bronze', // Default tier
                history: []
            });
        }

        res.status(200).json({
            success: true,
            data: reward
        });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR, error: error.message });
    }
};

// @desc    Get detailed transaction history of rewards
// @route   GET /api/v1/rewards/history
export const getRewardHistory = async (req, res) => {
    try {
        // We filter by 'Credit' or 'Debit' based on your REWARD_TYPES constant
        const history = await Transaction.find({ 
            user: req.user._id,
            $or: [
                { type: REWARD_TYPES.CREDIT },
                { type: REWARD_TYPES.DEBIT }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            history: history
        });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR, error: error.message });
    }
};