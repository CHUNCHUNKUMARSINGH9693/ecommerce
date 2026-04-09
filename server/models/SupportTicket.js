// 


import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema({
  user: { type: String, default: "Jay" }, // In real app, use mongoose.Schema.Types.ObjectId
  issueType: { type: String, required: true },
  priority: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Resolved'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('SupportTicket', supportTicketSchema);