    import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Credit', 'Debit'], required: true },
  description: { type: String, required: true }, // e.g., "Referral bonus for Jay"
  status: { type: String, enum: ['Successful', 'Pending', 'Failed'], default: 'Successful' }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);