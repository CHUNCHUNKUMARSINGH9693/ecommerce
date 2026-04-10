import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// 🔐 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    // ✅ 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // ✅ 2. Normalize email
    const normalizedEmail = email.toLowerCase();

    // ✅ 3. Check existing user
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ 4. Generate referral code
    const myReferralCode =
      "UTK" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // ✅ 5. Create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      appliedReferral: referralCode || null,
      myReferralCode,
    });

    // ✅ 6. Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.myReferralCode,
      },
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// 🔑 LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // ✅ 2. Normalize email
    const normalizedEmail = email.toLowerCase();

    // ✅ 3. Find user
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ 4. Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ 5. Success
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        referralCode: user.myReferralCode,
      },
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};