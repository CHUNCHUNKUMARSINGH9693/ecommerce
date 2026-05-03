// server/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { PROPERTY_CATEGORIES } from './utils/constants.js'; // Import your allowed categories

dotenv.config();

const seedFromAPI = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("🗑️ Clearing old products...");
    await Product.deleteMany();

    console.log("📡 Fetching data from external API...");
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();

    const baseProducts = data.products.map(p => {
      // Logic: If the external category isn't in your allowed list, 
      // default it to the first valid category (usually 'Electronics' or 'Fashion')
      const validCategory = PROPERTY_CATEGORIES.includes(p.category) 
        ? p.category 
        : PROPERTY_CATEGORIES[0]; 

      return {
        name: p.title,
        price: p.price,
        category: validCategory, // This fixes the Enum validation error
        image: p.thumbnail,
        tag: p.rating > 4.5 ? 'best-seller' : 'new-arrival'
      };
    });

    console.log("📦 Multiplying data to reach 1000+ items...");
    let bulkProducts = [];
    for (let i = 0; i < 10; i++) {
      const clonedBatch = baseProducts.map(product => ({
        ...product,
        name: `${product.name} (Batch ${i + 1})` 
      }));
      bulkProducts = [...bulkProducts, ...clonedBatch];
    }

    console.log(`🚀 Inserting ${bulkProducts.length} products...`);
    await Product.insertMany(bulkProducts);
    
    console.log("✅ 1000+ Products Seeded Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedFromAPI();