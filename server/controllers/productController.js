import mongoose from 'mongoose';
import Product from '../models/Product.js';


/**
 * @desc Helper to convert DB tags to Display tags
 */
const toStatusTag = (tag) => {
  if (tag === 'best-seller') return 'Best Seller';
  if (tag === 'new-arrival') return 'Hot';
  return 'Normal';
};

/**
 * @desc    Get all products (Raw)
 * @route   GET /api/v1/products
 */
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: products.length,
      data: products 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get inventory with formatted tags for frontend
 * @route   GET /api/v1/inventory
 */
export const getInventory = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    const inventory = products.map((product) => ({
      _id: product._id,
      image: product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      name: product.name,
      category: product.category,
      status: toStatusTag(product.tag),
      price: product.price,
      tag: product.tag,
    }));

    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new product
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, image, tag } = req.body;

    if (!name || price === undefined || !category) {
      res.status(400);
      throw new Error('Please provide name, price, and category');
    }

    const product = await Product.create({ 
      name, 
      price: Number(price), 
      category, 
      image, 
      tag: tag || 'none' 
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product
 */
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    product = await Product.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product successfully removed' });
  } catch (error) {
    next(error);
  }
};

// --- FIXED CONTROLLERS BELOW (Changed productModel to Product) ---

export const getProductController = async (req, res) => {
  try {
    // Corrected from productModel to Product
    const products = await Product.find({}).sort({ createdAt: -1 }); 
    res.status(200).send({
      success: true,
      products, 
    });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// 2. Fix the Photo Controller (This is why your images are blank)
export const productPhotoController = async (req, res) => {
  try {
    const pid = req.params.pid;

    // Prevent Mongoose CastError when pid is missing/undefined
    if (!pid) {
      return res.status(400).json({
        success: false,
        message: 'Product id (pid) is required',
      });
    }

    // Validate ObjectId format
    if (!mongoose.isValidObjectId(pid)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product id (pid)',
      });
    }

    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Your Product model stores an image URL string (field: `image`),
    // not binary photo data. Return the URL so the frontend can render it.
    return res.status(200).json({
      success: true,
      image: product.image,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Error while getting product image',
      error: error?.message || error,
    });
  }
};

