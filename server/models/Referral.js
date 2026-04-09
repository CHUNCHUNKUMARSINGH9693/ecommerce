import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  rewardDistributed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Referral', referralSchema);