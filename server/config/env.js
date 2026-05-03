import dotenv from 'dotenv';
dotenv.config();

// This function strips ALL hidden characters, spaces, and quotes
const clean = (val) => {
  if (!val) return null;
  return val.replace(/['"\r\n\s]/g, '').trim(); 
};

const env = {
  NODE_ENV: clean(process.env.NODE_ENV) || 'development',
  PORT: clean(process.env.PORT) || 5000,
  
  // Strip hidden Windows characters from the connection string
  MONGO_URI: clean(process.env.MONGO_URI),
  
  JWT_SECRET: clean(process.env.JWT_SECRET),
  JWT_EXPIRE: clean(process.env.JWT_EXPIRE) || '30d',

  // Razorpay Configuration
  RAZORPAY_KEY_ID: clean(process.env.RAZORPAY_KEY_ID),
  RAZORPAY_KEY_SECRET: clean(process.env.RAZORPAY_KEY_SECRET),

  CLIENT_URL: clean(process.env.CLIENT_URL) || 'http://localhost:5173'
};

// 1. Database Safety Check
// Uses a Regex test to ignore any remaining invisible characters
if (!env.MONGO_URI || !(/^mongodb(\+srv)?:\/\//.test(env.MONGO_URI))) {
  console.error("DEBUG - Received URI:", `"${process.env.MONGO_URI}"`);
  throw new Error("❌ INVALID MONGO_URI: Ensure it starts with 'mongodb://' or 'mongodb+srv://' in your .env file.");
}

// 2. Razorpay Validation
if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
  console.error("❌ CRITICAL ERROR: Razorpay API keys are missing in .env file.");
}

export default env;