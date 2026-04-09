import cron from 'node-cron';
import User from '../models/User.js';

/**
 * Scheduled Task: Runs every Sunday at 3 AM
 */
const startCleanupJob = () => {
    cron.schedule('0 3 * * 0', async () => {
        console.log('🧹 Starting Weekly Database Cleanup...');

        try {
            // Delete users who never verified their email after 30 days
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            
            const result = await User.deleteMany({
                isVerified: false,
                createdAt: { $lt: thirtyDaysAgo }
            });

            console.log(`✅ Cleanup Complete. Removed ${result.deletedCount} unverified users.`);
        } catch (error) {
            console.error('❌ Cleanup Job Error:', error.message);
        }
    });
};

export default startCleanupJob;