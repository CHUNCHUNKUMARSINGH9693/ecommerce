import Deal from '../models/Deal.js';
import Reward from '../models/Reward.js';
import Transaction from '../models/Transaction.js';

export const getDashboardSummary = async (userId) => {
    const [deals, rewards, recentActivity] = await Promise.all([
        Deal.find({ user: userId }),
        Reward.findOne({ user: userId }),
        Transaction.find({ user: userId }).limit(5).sort({ createdAt: -1 })
    ]);

    const totalDeals = deals.length;
    const closedDeals = deals.filter(d => d.status === 'Closed').length;
    
    return {
        stats: {
            totalDeals,
            successRate: totalDeals > 0 ? ((closedDeals / totalDeals) * 100).toFixed(0) : 0,
            earnedPoints: rewards?.points || 0,
            pendingPoints: rewards?.pending || 0
        },
        recentActivity
    };
};