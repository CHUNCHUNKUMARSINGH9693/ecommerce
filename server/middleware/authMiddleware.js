import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc    Middleware to protect routes and verify JWT
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password').lean();

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user no longer exists'
        });
      }

      return next();
    } catch (error) {
      console.error(`[Auth Middleware Error]: ${error.message}`);
      let message = 'Not authorized, token failed';
      if (error.name === 'TokenExpiredError') message = 'Session expired, please login again';
      if (error.name === 'JsonWebTokenError') message = 'Invalid token';

      return res.status(401).json({
        success: false,
        message
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};

/**
 * @desc    Middleware to check for Admin privileges
 * @add     This solves your "admin export" error
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as an admin. Access denied.'
    });
  }
};