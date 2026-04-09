import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientName: { type: String, required: true },
  propertyName: { type: String, required: true },
  category: { type: String, enum: ['Residential', 'Commercial', 'Plots'], required: true },
  status: { type: String, enum: ['Pending', 'Active', 'Closed', 'Failed'], default: 'Pending' },
  dealValue: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Deal', dealSchema);