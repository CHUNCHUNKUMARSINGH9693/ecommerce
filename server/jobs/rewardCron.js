import cron from 'node-cron';
import Reward from '../models/Reward.js';

const startRewardCron = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('⏰ Running Daily Reward Processing Job...');

        try {
            // Example: Find all rewards with pending points and process them
            const rewards = await Reward.find({ pending: { $gt: 0 } });

            for (let reward of rewards) {
                // Here you would add your business logic:
                // e.g., If 7 days have passed since the deal was closed
                // reward.points += reward.pending;
                // reward.pending = 0;
                // await reward.save();
            }
            
            console.log('✅ Reward Processing Complete.');
        } catch (error) {
            console.error('❌ Reward Cron Error:', error.message);
        }
    });
};

export default startRewardCron;