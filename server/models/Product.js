import mongoose from 'mongoose';
// Update this import to match your constants.js variable name
import { CATEGORIES } from '../utils/constants.js';

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
        enum: CATEGORIES, // Matches the updated constant
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

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;