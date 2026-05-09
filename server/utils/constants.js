// Status for business deals or transactions
export const DEAL_STATUS = {
    PENDING: 'Pending',
    ACTIVE: 'Active',
    CLOSED: 'Closed',
    FAILED: 'Failed'
};

// Core categories used for Mongoose Schema 'enum' validation
export const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Beauty",
  "Home",
  "Grocery",
  "Luxury",
];

// Labels for frontend UI
export const CATEGORY_LABELS = {
  Electronics: "Electronics & Tech",
  Fashion: "Fashion & Apparel",
  Beauty: "Beauty & Fragrance",
  Home: "Home & Kitchen",
  Grocery: "Grocery & Food",
  Luxury: "Luxury & Watches",
};

// Transaction or Reward point types
export const REWARD_TYPES = {
    CREDIT: 'Credit',
    DEBIT: 'Debit'
};

// Standardized API error responses
export const ERROR_MESSAGES = {
    UNAUTHORIZED: 'Not authorized, please login.',
    SERVER_ERROR: 'Internal server error, please try again later.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please provide all required fields.'
};