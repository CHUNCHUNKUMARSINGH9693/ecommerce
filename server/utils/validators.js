
export const isValidEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

/**
 * Validates if a string meets minimum password requirements
 */
export const isStrongPassword = (password) => {
    // Min 8 chars, at least one letter and one number
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
};

/**
 * Checks if a string is a valid MongoDB ObjectId
 */
export const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};