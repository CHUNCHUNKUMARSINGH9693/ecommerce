import User from "../models/User.js";
import Referral from "../models/Referral.js";
import Reward from "../models/Reward.js";
import Transaction from "../models/Transaction.js";
import generateToken from "../utils/generateToken.js";

// 🔐 REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    // ✅ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    // ✅ Normalize Email
    const normalizedEmail = email.toLowerCase().trim();

    // ✅ Check Existing User
    const userExists = await User.findOne({
      email: normalizedEmail,
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Create User
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      appliedReferral: referralCode || null,
    });

    // ✅ Referral Logic
    if (referralCode) {
      try {
        const referrer = await User.findOne({
          referralCode: referralCode.toUpperCase(),
        });

        // Prevent self referral
        if (
          referrer &&
          referrer._id.toString() !== user._id.toString()
        ) {
          // Create referral entry
          await Referral.create({
            referrer: referrer._id,
            referredUser: user._id,
            status: "Completed",
            rewardDistributed: true,
          });

          // Find reward document
          let referrerReward = await Reward.findOne({
            user: referrer._id,
          });

          // Create reward if doesn't exist
          if (!referrerReward) {
            referrerReward = await Reward.create({
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

          // Create transaction
          await Transaction.create({
            user: referrer._id,
            amount: 50,
            type: "Credit",
            status: "completed",
            description: `Referral reward for inviting ${user.name}`,
          });
        }
      } catch (referralError) {
        console.log(
          "Referral Logic Error => ",
          referralError
        );
      }
    }

    // ✅ Success Response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
      },
      token: generateToken(user._id),
    });

  } catch (error) {
    console.log("REGISTER ERROR => ", error);

    return res.status(500).json({
      success: false,
      message: "Registration Failed",
      error: error.message,
    });
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