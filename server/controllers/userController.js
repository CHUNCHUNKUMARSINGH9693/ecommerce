import User from '../models/User.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
        joinedAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email ? req.body.email.toLowerCase() : user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        referralCode: updatedUser.referralCode,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's network / statistics (Optional for User Tab)
// @route   GET /api/v1/users/stats
// @access  Private
export const getUserNetworkStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('referrals');

    res.json({
      success: true,
      data: {
        totalReferrals: user?.referrals?.length || 0,
        accountStatus: 'Active',
        kycVerified: user?.isVerified || false,
      },
    });
  } catch (error) {
    next(error);
  }
};