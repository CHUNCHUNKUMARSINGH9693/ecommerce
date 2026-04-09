import Transaction from '../models/Transaction.js';

export const getRecentHistory = async (req, res) => {
    const history = await Transaction.find({ user: req.user._id })
        .limit(10)
        .sort('-createdAt');
    res.json(history);
};