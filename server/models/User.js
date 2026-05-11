import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    referralCode: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },

    appliedReferral: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ BEFORE VALIDATE
userSchema.pre("validate", function () {

  // Normalize Email
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }

  // Generate Referral Code
  if (!this.referralCode) {
    this.referralCode = `REF${Math.random()
      .toString(36)
      .slice(2, 10)
      .toUpperCase()}`;
  }
});

// ✅ HASH PASSWORD
userSchema.pre("save", async function () {

  // Skip if password not modified
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

// ✅ MATCH PASSWORD
userSchema.methods.matchPassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

// ✅ EXPORT MODEL
const User = mongoose.model("User", userSchema);

export default User;