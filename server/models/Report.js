import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Earnings', 'Deals', 'Team'], required: true },
  fileUrl: { type: String }, // Path to generated PDF or CSV
  status: { type: String, default: 'Generated' }
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);