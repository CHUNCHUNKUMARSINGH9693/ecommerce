// Simple helper to check if required fields are present
export const validateFields = (fields) => {
    return (req, res, next) => {
        for (const field of fields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Please provide ${field}` });
            }
        }
        next();
    };
};

// Usage Example in routes: router.post('/login', validateFields(['email', 'password']), loginUser);