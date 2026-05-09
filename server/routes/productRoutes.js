import express from 'express';
import {
  getProducts,
  getInventory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoController, // 1. IMPORT the new controller here
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
 * @desc    Get formatted inventory
 */
router.get('/inventory', getInventory);

/**
 * @route   GET /api/v1/products/product-photo/:pid
 * @desc    Get product photo by product ID
 */
// 2. ADD THIS ROUTE specifically for the photos
router.get("/product-photo/:pid", productPhotoController);
/**
 * @route   GET /api/v1/products/:id
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/v1/products
 */
router.post('/', protect, createProduct);

/**
 * @route   PUT /api/v1/products/:id
 */
router.put('/:id', protect, updateProduct);

/**
 * @route   DELETE /api/v1/products/:id
 */
router.delete('/:id', protect, deleteProduct);

export default router;