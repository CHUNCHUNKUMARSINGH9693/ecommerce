import express from 'express';
import { createRazorpayOrder, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Update this line to match your frontend call exactly
router.post('/razorpay-order', protect, createRazorpayOrder);

// Verification route
router.post('/verify', protect, verifyPayment);

export default router;