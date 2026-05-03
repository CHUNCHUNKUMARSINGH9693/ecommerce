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
      _id: product._id, // Keep as _id for frontend consistency
      image: product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      name: product.name,
      category: product.category,
      status: toStatusTag(product.tag), // "Hot", "Best Seller", etc.
      price: product.price,
      tag: product.tag, // "new-arrival", "best-seller", etc.
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
 * @route   POST /api/v1/products
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, image, tag } = req.body;

    // Basic Validation
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
 * @route   PUT /api/v1/products/:id
 */
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Update only the fields provided in req.body
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
 * @route   DELETE /api/v1/products/:id
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