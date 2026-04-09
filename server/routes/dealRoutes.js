import express from 'express';
import { createDeal, getUserDeals } from '../controllers/dealController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getUserDeals)
    .post(protect, createDeal);

export default router;