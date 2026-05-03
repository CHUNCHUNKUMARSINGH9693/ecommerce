import Razorpay from 'razorpay';
import crypto from 'crypto';
import env from '../config/env.js';

// Debug: Log key status to terminal (NOT the actual secret for security)
console.log('--- Razorpay SDK Initialization ---');
console.log('RAZORPAY_KEY_ID exists:', !!env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET exists:', !!env.RAZORPAY_KEY_SECRET);
console.log('------------------------------------');

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID || '', 
  key_secret: env.RAZORPAY_KEY_SECRET || '',
});

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    // Direct check before calling external API
    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ 
        success: false, 
        message: "Razorpay credentials are not loaded on the server." 
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      key_id: env.RAZORPAY_KEY_ID 
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing required payment details" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification error" });
  }
};