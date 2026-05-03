import mongoose from 'mongoose';
// Ensure this utility file exists on your server side
import { PROPERTY_CATEGORIES } from '../utils/constants.js';

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'] 
    },
    category: { 
        type: String, 
        enum: PROPERTY_CATEGORIES, 
        required: [true, 'Category is required'] 
    },
    image: { 
        type: String,
        default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' 
    },
    tag: { 
        type: String, 
        enum: ['new-arrival', 'best-seller', 'none'], 
        default: 'none' 
    }
}, { timestamps: true });

// Check if model already exists to prevent OverwriteModelError in development
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;