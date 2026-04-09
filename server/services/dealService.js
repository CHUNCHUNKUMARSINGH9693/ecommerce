import Deal from '../models/Deal.js';

export const updateDealStatus = async (dealId, status) => {
    const deal = await Deal.findById(dealId);
    if (!deal) throw new Error('Deal not found');

    deal.status = status;
    await deal.save();

    // If a deal is closed, you might want to trigger a commission reward here
    // if (status === 'Closed') { ... logic ... }

    return deal;
};