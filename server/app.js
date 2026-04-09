// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Import Custom Middlewares
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// // Import Route Files
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import dashboardRoutes from './routes/dashboardRoutes.js';
// import dealRoutes from './routes/dealRoutes.js';
// import rewardRoutes from './routes/rewardRoutes.js';
// import referralRoutes from './routes/referralRoutes.js';
// import reportRoutes from './routes/reportRoutes.js';
// import supportRoutes from './routes/supportRoutes.js';

// // ES Module fix for __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// /**
//  * 1. GLOBAL MIDDLEWARE
//  */

// // Security Headers (Protects from common web vulnerabilities)
// app.use(helmet({
//     crossOriginResourcePolicy: false, // Allows images from 'uploads' to be seen by frontend
// }));

// // Cross-Origin Resource Sharing (Allows your React app to talk to this API)
// app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173', // Your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

// // HTTP Request Logging (Only in development)
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// // Body Parsers (Reads JSON and URL-encoded data from requests)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static Folder (Makes the 'uploads' folder publicly accessible)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// /**
//  * 2. API ROUTES
//  * Versioning with /api/v1 is a best practice
//  */
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/dashboard', dashboardRoutes);
// app.use('/api/v1/deals', dealRoutes);
// app.use('/api/v1/rewards', rewardRoutes);
// app.use('/api/v1/referrals', referralRoutes);
// app.use('/api/v1/reports', reportRoutes);
// app.use('/api/v1/support', supportRoutes);

// // Health Check endpoint
// app.get('/health', (req, res) => {
//     res.status(200).json({ status: 'OK', message: 'Server is healthy' });
// });


// /**
//  * 3. ERROR HANDLING
//  * (These must be placed AFTER the routes)
//  */
// app.use(notFound);      // Catches 404s
// app.use(errorHandler);  // Catches all other errors and returns JSON

// export default app;


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Import Custom Middlewares
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import Route Files
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import dealRoutes from './routes/dealRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js';
import referralRoutes from './routes/referralRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import supportRoutes from './routes/supportRoutes.js';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * 1. GLOBAL MIDDLEWARE
 */

// Security Headers
app.use(helmet({
    crossOriginResourcePolicy: false, 
}));

// Optimized CORS Configuration
// Only use ONE instance of cors() to prevent configuration override issues
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Uses env variable or default
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body Parsers
app.use(express.json({ limit: '10mb' })); // Added limit for potential document uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


/**
 * 2. API ROUTES
 */
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/deals', dealRoutes);
app.use('/api/v1/rewards', rewardRoutes);
app.use('/api/v1/referrals', referralRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/support', supportRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Utkarsh Home Server is healthy' });
});


/**
 * 3. ERROR HANDLING
 */
app.use(notFound);
app.use(errorHandler);

export default app;