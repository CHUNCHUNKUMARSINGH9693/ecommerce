import jwt from 'jsonwebtoken';

/**
 * Generates a signed JWT for a specific user ID
 * @param {string} id - The MongoDB User ID
 * @returns {string} - The signed JWT
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
};

export default generateToken;