    import Deal from '../models/Deal.js';

export const createDeal = async (req, res) => {
    const { propertyName, category, clientName } = req.body;

    const deal = await Deal.create({
        user: req.user._id,
        propertyName,
        category,
        clientName,
        status: 'Pending'
    });

    res.status(201).json(deal);
};

export const getUserDeals = async (req, res) => {
    const deals = await Deal.find({ user: req.user._id }).sort('-createdAt');
    res.json(deals);
};