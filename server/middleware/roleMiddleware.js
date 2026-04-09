export const authorize = (...roles) => {
    return (req, res, next) => {
        // req.user is available because 'protect' middleware runs first
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `User role '${req.user.role}' is not authorized to access this route` 
            });
        }
        next();
    };
};

// Usage Example in routes: router.get('/admin-stats', protect, authorize('admin'), getStats);