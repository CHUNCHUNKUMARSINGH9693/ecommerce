// // Handles 404 (Route not found)
// export const notFound = (req, res, next) => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
// };

// // Global error handler
// export const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
//     res.status(statusCode).json({
//         message: err.message,
//         // Only show stack trace in development mode
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// };



/**
 * 404 Not Found Middleware
 * This catches any requests to routes that don't exist and passes them to the error handler.
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Global Error Handling Middleware
 * Centralized spot to handle all types of errors (Database, Validation, Auth, etc.)
 */
export const errorHandler = (err, req, res, next) => {
    // 1. Determine Status Code
    // If the error has a status code (like 404 from above), use it. Otherwise, default to 500 (Server Error).
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // 2. Handle Specific Mongoose Errors
    
    // If MongoDB ID is invalid (e.g., /api/users/123)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found: Invalid ID format';
    }

    // If a required field is missing in MongoDB Schema
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    // If there is a duplicate key error (e.g., registering an email that already exists)
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // 3. Send Response
    res.status(statusCode).json({
        success: false,
        message,
        // Include stack trace only when NOT in production to help with debugging
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};