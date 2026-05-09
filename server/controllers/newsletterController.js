const Newsletter = require("../models/Newsletter");

exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Check if user is already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ success: false, message: "You are already subscribed!" });
    }

    await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error. Try again later." });
  }
};