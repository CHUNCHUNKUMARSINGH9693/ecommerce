import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  pending: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Reward', rewardSchema);