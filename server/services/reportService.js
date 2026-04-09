import Transaction from '../models/Transaction.js';
import Deal from '../models/Deal.js';

export const generateUserActivityReport = async (userId, type) => {
    if (type === 'Transactions') {
        return await Transaction.find({ user: userId }).sort({ createdAt: -1 });
    }
    if (type === 'Deals') {
        return await Deal.find({ user: userId }).sort({ createdAt: -1 });
    }
    return [];
};