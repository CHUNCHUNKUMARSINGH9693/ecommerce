import Reward from '../models/Reward.js';
import Transaction from '../models/Transaction.js';

// @desc    Get current user reward balance and summary
// @route   GET /api/v1/rewards/my-balance
// @access  Private
export const getMyRewards = async (req, res) => {
    try {
        const reward = await Reward.findOne({ user: req.user._id });

        if (!reward) {
            return res.status(200).json({
                points: 0,
                totalEarned: 0,
                pending: 0,
                history: []
            });
        }

        res.status(200).json(reward);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get detailed transaction history of rewards
// @route   GET /api/v1/rewards/history
// @access  Private
export const getRewardHistory = async (req, res) => {
    try {
        const history = await Transaction.find({ 
            user: req.user._id,
            type: 'reward' 
        }).sort({ createdAt: -1 });

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};