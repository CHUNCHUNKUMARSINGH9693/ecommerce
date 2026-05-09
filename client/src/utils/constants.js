export const APP_CONFIG = {
  NAME: 'Utkarsh Home',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@utkarshhome.com',
};

// Simplified to 3 main states for cleaner dashboard tracking
export const TRANSACTION_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
};

/** 
 * CATEGORIES: Used for Mongoose Schema validation (enum)
 * These values must match exactly what is stored in your database.
 */
export const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home",
  "Grocery",
  "Luxury",
  "Furniture",
  "Health",
];

export const CATEGORY_LABELS = {
  Electronics: "Electronics & Tech",
  Fashion: "Fashion & Apparel",
  Beauty: "Beauty & Personal Care",
  Home: "Home & Kitchen",
  Grocery: "Daily Groceries",
  Luxury: "Premium Luxury",
  Furniture: "Modern Furniture",
  Health: "Health & Wellness"
};

/**
 * CATEGORY_STYLES: Used for Frontend rendering (Icons, Colors)
 * This maps the raw database value to the visual style from the image.
 */
export const CATEGORY_STYLES = {
  "Electronics": { icon: "💻", color: "bg-blue-50", textColor: "text-blue-600", label: "Electronics & Tech" },
  "Fashion": { icon: "👕", color: "bg-orange-50", textColor: "text-orange-600", label: "Fashion & Apparel" },
  "Beauty": { icon: "🧴", color: "bg-purple-50", textColor: "text-purple-600", label: "Beauty & Fragrance" },
  "Home": { icon: "🍲", color: "bg-yellow-50", textColor: "text-yellow-700", label: "Home & Kitchen" },
  "Grocery": { icon: "🛒", color: "bg-green-50", textColor: "text-green-600", label: "Grocery & Food" },
  "Luxury": { icon: "⌚", color: "bg-red-50", textColor: "text-red-600", label: "Luxury & Watches" },
  "Furniture": { icon: "🪑", color: "bg-emerald-50", textColor: "text-emerald-600", label: "Furniture & Decor" },
  "Health": { icon: "🐾", color: "bg-sky-50", textColor: "text-sky-600", label: "Health & Pets" },
};

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  PRODUCTS: '/api/products',
  DASHBOARD: '/api/dashboard',
  DEALS: '/api/deals',
  REPORTS: '/api/reports',
};

export const COLORS = {
  PRIMARY: '#4f46e5', // Indigo-600
  SUCCESS: '#16a34a', // Green-600
  DANGER: '#dc2626',  // Red-600
  SKY: '#0ea5e9'      // Sky-500 (matched to your theme)
};