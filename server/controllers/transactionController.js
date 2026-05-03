import Deal from "../models/Deal.js";

export const getRecentHistory = async (req, res, next) => {
  try {
    const orders = await Deal.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const history = orders.map((order) => ({
      id: order._id,
      customer: order.clientName || "Guest Customer",
      date: order.createdAt,
      status: order.status,
      total: order.dealValue || 0,
    }));

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};