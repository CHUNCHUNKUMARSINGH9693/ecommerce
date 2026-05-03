import SupportTicket from '../models/SupportTicket.js';

// @desc    Create a new support ticket
// @route   POST /api/support/create
export const createTicket = async (req, res) => {
  try {
    const { issueType, priority, subject, description } = req.body;

    // Validation
    if (!subject || !priority) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newTicket = new SupportTicket({
      user: req.user?._id,
      issueType: issueType || 'General Inquiry',
      priority,
      subject,
      description: description || '',
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
    const query = req.user?._id ? { user: req.user._id } : {};
    const tickets = await SupportTicket.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ticket details by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};