import Reward from '../models/Reward.js';
import Transaction from '../models/Transaction.js';

export const addRewardPoints = async (userId, amount, description) => {
    // 1. Update the Reward record
    let reward = await Reward.findOneAndUpdate(
        { user: userId },
        { $inc: { points: amount, totalEarned: amount } },
        { new: true, upsert: true }
    );

    // 2. Create a Transaction record for history
    await Transaction.create({
        user: userId,
        amount,
        description,
        type: 'Credit',
        status: 'Successful'
    });

    return reward;
};