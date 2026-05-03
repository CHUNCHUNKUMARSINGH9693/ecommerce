import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // New e-commerce fields
    title: { type: String, trim: true },
    discountPercentage: { type: Number, min: 0, max: 100 },
    expiryDate: { type: Date },
    // Existing dashboard fields kept for compatibility
    clientName: { type: String, trim: true },
    propertyName: { type: String, trim: true },
    category: { type: String, enum: ['Residential', 'Commercial', 'Plots', 'Industrial'] },
    dealValue: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Active', 'Closed', 'Failed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Deal', dealSchema);