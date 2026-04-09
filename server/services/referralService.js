import User from '../models/User.js';
import Referral from '../models/Referral.js';
import { addRewardPoints } from './rewardService.js';

export const processReferral = async (newUserId, referralCode) => {
    if (!referralCode) return;

    const referrer = await User.findOne({ myReferralCode: referralCode });
    if (!referrer) return;

    // 1. Create the Referral Link
    await Referral.create({
        referrer: referrer._id,
        referredUser: newUserId,
        status: 'Completed'
    });

    // 2. Give bonus points to the referrer (Example: 500 points)
    await addRewardPoints(
        referrer._id, 
        500, 
        `Referral bonus for inviting a new member`
    );
};