import Deal from '../models/Deal.js'; // Ensure your model name is correct

// @desc    Get all deals
export const getDeals = async (req, res, next) => {
  try {
    const query = req.user?._id ? { user: req.user._id } : {};
    const deals = await Deal.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: deals });
  } catch (error) {
    next(error);
  }
};

// @desc    Get specific deal by ID
export const getDealById = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      res.status(404);
      throw new Error('Deal not found');
    }
    res.status(200).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new deal
export const createDeal = async (req, res, next) => {
  try {
    const {
      title,
      discountPercentage,
      expiryDate,
      clientName,
      propertyName,
      category,
      dealValue,
      status,
    } = req.body;

    if (!title && !clientName) {
      res.status(400);
      throw new Error('title or clientName is required');
    }

    const deal = await Deal.create({
      user: req.user?._id,
      title,
      discountPercentage,
      expiryDate,
      clientName,
      propertyName,
      category,
      dealValue,
      status,
    });

    res.status(201).json({ success: true, data: deal });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a deal
export const updateDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      res.status(404);
      throw new Error('Deal not found');
    }

    const fields = [
      'title',
      'discountPercentage',
      'expiryDate',
      'clientName',
      'propertyName',
      'category',
      'dealValue',
      'status',
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        deal[field] = req.body[field];
      }
    });

    const updated = await deal.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a deal
export const deleteDeal = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      res.status(404);
      throw new Error('Deal not found');
    }

    await deal.deleteOne();
    res.status(200).json({ success: true, message: 'Deal deleted' });
  } catch (error) {
    next(error);
  }
};