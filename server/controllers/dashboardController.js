import Deal from '../models/Deal.js';
import Product from '../models/Product.js'; 
import User from '../models/User.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401);
      throw new Error("User not authenticated");
    }

    const [ordersCount, productsCount, customersCount, salesAgg] = await Promise.all([
      Deal.countDocuments({ user: userId }),
      Product.countDocuments(),
      User.countDocuments(),
      Deal.aggregate([
        { $match: { user: userId } },
        { $group: { _id: null, totalSales: { $sum: { $ifNull: ["$dealValue", 0] } } } },
      ]),
    ]);

    const totalSales = salesAgg?.[0]?.totalSales || 0;

    res.status(200).json({
      success: true,
      data: {
        totalSales,
        orderCount: ordersCount,
        productCount: productsCount,
        customerCount: customersCount,
      },
    });
  } catch (error) {
    next(error);
  }
};