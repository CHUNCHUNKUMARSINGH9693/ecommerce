import User from "../models/User.js";
import Referral from "../models/Referral.js";
import Reward from "../models/Reward.js";
import Transaction from "../models/Transaction.js";
import generateToken from "../utils/generateToken.js";

// 🔐 REGISTER
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, referralCode } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const normalizedEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      appliedReferral: referralCode || null,
    });

    // Track referral and reward distribution if a valid referral code is used.
    if (referralCode) {
      const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });

      if (referrer && referrer._id.toString() !== user._id.toString()) {
        await Referral.create({
          referrer: referrer._id,
          referredUser: user._id,
          status: "Completed",
          rewardDistributed: true,
        });

        const referrerReward = await Reward.findOne({ user: referrer._id });
        if (!referrerReward) {
          await Reward.create({
            user: referrer._id,
            points: 50,
            totalEarned: 50,
            pending: 0,
          });
        } else {
          referrerReward.points += 50;
          referrerReward.totalEarned += 50;
          referrerReward.lastUpdated = new Date();
          await referrerReward.save();
        }

        await Transaction.create({
          user: referrer._id,
          amount: 50,
          type: "Credit",
          status: "completed",
          description: `Referral reward for inviting ${user.name}`,
        });
      }
    }

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// 🔑 LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// 👤 GET PROFILE
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// 🚪 LOGOUT
export const logoutUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    token: null,
  });
};