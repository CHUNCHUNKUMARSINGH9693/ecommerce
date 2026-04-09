// import SupportTicket from '../models/SupportTicket.js';

// export const createTicket = async (req, res) => {
//     const { subject, message, priority } = req.body;

//     const ticket = await SupportTicket.create({
//         user: req.user._id,
//         subject,
//         message,
//         priority,
//         status: 'Open'
//     });

//     res.status(201).json(ticket);
// };

import SupportTicket from '../models/SupportTicket.js';

// @desc    Create a new support ticket
// @route   POST /api/support/create
export const createTicket = async (req, res) => {
  try {
    const { issueType, priority, subject, description } = req.body;

    // Validation
    if (!subject || !description) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newTicket = new SupportTicket({
      issueType,
      priority,
      subject,
      description
    });

    const savedTicket = await newTicket.save();
    res.status(201).json({ success: true, data: savedTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all tickets (for history)
export const getTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};