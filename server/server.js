import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import env from "./config/env.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import dealRoutes from "./routes/dealRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // 1. Added Payment Routes

// Middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Jobs
import startRewardCron from "./jobs/rewardCron.js";
import startCleanupJob from "./jobs/cleanup.js";

// Fix __dirname (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * ===============================
 * 1. GLOBAL MIDDLEWARE
 * ===============================
 */

// Security
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 2. STRIPE WEBHOOK (Must be BEFORE express.json)
// This route receives a raw buffer for signature verification
app.post(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    // Webhook logic usually lives in its own controller, but the raw body config happens here.
    // For now, pass to your payment controller or handle here.
  }
);

// Logging
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/**
 * ===============================
 * 2. ROUTES
 * ===============================
 */

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/deals", dealRoutes);
app.use("/api/v1/rewards", rewardRoutes);
app.use("/api/v1/referrals", referralRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/payments", paymentRoutes); // 3. Registered Payment Routes

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Admin API is running",
  });
});

/**
 * ===============================
 * 3. ERROR HANDLING
 * ===============================
 */
app.use(notFound);
app.use(errorHandler);

/**
 * ===============================
 * 4. START SERVER
 * ===============================
 */

const startServer = async () => {
  try {
    await connectDB();
    console.log("📦 MongoDB Connected");

    startRewardCron();
    startCleanupJob();

    const PORT = env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error(`❌ Error: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();