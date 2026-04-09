/**
 * Standardizes API responses
 * @param {boolean} success - Operation status
 * @param {string} message - Human-readable message
 * @param {object} data - The payload
 */
export const formatResponse = (success, message, data = null) => {
    return {
        success,
        message,
        data,
        timestamp: new Date().toISOString()
    };
};

// Example usage in controller: 
// res.status(200).json(formatResponse(true, 'Data fetched', deals));