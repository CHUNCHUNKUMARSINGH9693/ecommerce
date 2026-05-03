import express from 'express';
import {
  getProducts,
  getInventory, // ✅ Added this
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/v1/products
 * @desc    Get raw products list
 */
router.get('/', getProducts);

/**
 * @route   GET /api/v1/products/inventory
 * @desc    Get formatted inventory for Dashboard/WorkSamples
 * @note    This should be ABOVE /:id to prevent "inventory" being treated as an ID
 */
router.get('/inventory', getInventory);

/**
 * @route   GET /api/v1/products/:id
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/v1/products
 * @desc    Admin only (protected)
 */
router.post('/', protect, createProduct);

/**
 * @route   PUT /api/v1/products/:id
 * @desc    Admin only (protected)
 */
router.put('/:id', protect, updateProduct);

/**
 * @route   DELETE /api/v1/products/:id
 * @desc    Admin only (protected)
 */
router.delete('/:id', protect, deleteProduct);

export default router;