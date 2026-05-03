import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc    Middleware to protect routes and verify JWT
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Check for Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from the token (excluding password)
      // We use lean() for faster read performance since we don't need Mongoose methods here
      req.user = await User.findById(decoded.id).select('-password').lean();

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user no longer exists'
        });
      }

      // 4. Move to next middleware/controller
      return next();

    } catch (error) {
      console.error(`[Auth Middleware Error]: ${error.message}`);
      
      // Handle specific JWT errors for better frontend debugging
      let message = 'Not authorized, token failed';
      if (error.name === 'TokenExpiredError') message = 'Session expired, please login again';
      if (error.name === 'JsonWebTokenError') message = 'Invalid token';

      return res.status(401).json({
        success: false,
        message
      });
    }
  }

  // 5. If no token is present at all
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};