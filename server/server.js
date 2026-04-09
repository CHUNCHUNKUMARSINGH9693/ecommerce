// import app from './app.js';
// import connectDB from './config/db.js';
// import env from './config/env.js';
// import startRewardCron from './jobs/rewardCron.js';
// import startCleanupJob from './jobs/cleanup.js';

// /**
//  * UTKARSH HOME - SERVER BOOTSTRAP
//  * This file connects all pieces: DB, Cron Jobs, and Express.
//  */

// const startServer = async () => {
//     try {
//         // 1. Connect to MongoDB
//         await connectDB();

//         // 2. Initialize Background Jobs
//         // These run independently to handle rewards and database cleanup
//         startRewardCron();
//         startCleanupJob();

//         // 3. Start Listening for requests
//         const PORT = env.PORT || 5000;
//         const server = app.listen(PORT, () => {
//             console.log(`
//           🚀 Server is Running on port
//           📡 Port: ${PORT}
//           🌍 Mode: ${env.NODE_ENV}
//           🛠️  Background Jobs: ACTIVE
//             `); 
//         });

//         // 4. Handle Global "Unhandled Rejections" 
//         // (Prevents the app from crashing silently)
//         process.on('unhandledRejection', (err) => {
//             console.error(`❌ Unhandled Rejection: ${err.message}`);
//             // Close server & exit process
//             server.close(() => process.exit(1));
//         });

//     } catch (error) {
//         console.error(`❌ Failed to start server: ${error.message}`);
//         process.exit(1);
//     }
// };

// startServer();


import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';
import startRewardCron from './jobs/rewardCron.js';
import startCleanupJob from './jobs/cleanup.js';

/**
 * UTKARSH HOME - SERVER BOOTSTRAP
 * Connects Database, Background Jobs, and Express.
 */

const startServer = async () => {
    try {
        // 1. Connect to MongoDB (Ensure your URI is in your .env file)
        await connectDB();
        console.log('📦 Database Connected Successfully');

        // 2. Initialize Background Jobs
        startRewardCron();
        startCleanupJob();

        // 3. Start Listening
        const PORT = env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`
          🚀 UTKARSH HOME SERVER READY
          📡 Port: ${PORT}
          🌍 Mode: ${env.NODE_ENV || 'development'}
          🛠️  Background Jobs: ACTIVE
            `); 
        });

        // 4. Graceful Shutdown & Error Handling
        process.on('unhandledRejection', (err) => {
            console.error(`❌ Unhandled Rejection: ${err.message}`);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        console.error(`❌ Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();