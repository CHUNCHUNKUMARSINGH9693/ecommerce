import Deal from '../models/Deal.js';
import Reward from '../models/Reward.js';

export const getDashboardStats = async (req, res) => {
    // Fetching data specifically for the logged-in user
    const totalDeals = await Deal.countDocuments({ user: req.user._id });
    const rewards = await Reward.findOne({ user: req.user._id });

    res.json({
        totalDeals,
        earnedPoints: rewards?.points || 0,
        pendingEarnings: rewards?.pending || 0,
        successRate: "85%", // Logic can be calculated based on deals
    });
};