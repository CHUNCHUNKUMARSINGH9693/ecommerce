import express from 'express';
import {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} from '../controllers/dealController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getDeals);
router.post('/', protect, createDeal);

router.get('/:id', protect, getDealById);
router.put('/:id', protect, updateDeal);
router.delete('/:id', protect, deleteDeal);

export default router;