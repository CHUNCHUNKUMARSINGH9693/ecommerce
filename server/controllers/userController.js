import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    // The 'protect' middleware adds the user object to 'req'
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            referralCode: user.myReferralCode,
            joinedAt: user.createdAt,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Update fields if they are sent in the body, otherwise keep current
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // If password is being updated, it will be hashed by the User Model's pre-save hook
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: req.headers.authorization.split(' ')[1], // Return the existing token
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get user's network / statistics (Optional for User Tab)
// @route   GET /api/v1/users/stats
// @access  Private
export const getUserNetworkStats = async (req, res) => {
    const user = await User.findById(req.user._id).populate('referrals');
    
    res.json({
        totalReferrals: user.referrals?.length || 0,
        accountStatus: 'Active',
        kycVerified: user.isVerified || false
    });
};