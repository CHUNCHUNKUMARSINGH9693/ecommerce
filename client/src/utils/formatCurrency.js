/**
 * Formats a number into Indian Rupee (INR) currency format.
 * @param {number} amount - The numeric value to format.
 * @returns {string} - Formatted string (e.g., ₹1,50,000)
 */
export const formatCurrency = (amount) => {
  if (isNaN(amount)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export default formatCurrency;