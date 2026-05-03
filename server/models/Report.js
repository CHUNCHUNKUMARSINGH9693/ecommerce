import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  relatedId: { type: mongoose.Schema.Types.ObjectId },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  status: { type: String, default: 'Open', enum: ['Open', 'In Review', 'Resolved'] }
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);