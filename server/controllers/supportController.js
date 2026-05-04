import SupportTicket from '../models/SupportTicket.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  const { message } = req.body; // Move this outside the try block for fallback access

  try {
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    // UPDATED: Using the current Gemini 3 Flash model
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
   const prompt = `
     You are the AI Concierge for 'Utkarsh Home'. 
     If a user asks for work samples or specific products we've worked on, 
     provide a brief description and a clickable link in this format: [View Project](/dashboard/work-samples).
  
     Example: "You can see our luxury smart home integration here: [View Work Sample](/dashboard/work-samples)"
  
     User Message: ${message}
   `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.status(200).json({ 
      success: true, 
      reply: response.text(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error) {
    console.error("Primary Model Error:", error.message);
    
    // Updated Fallback to Gemini 2.5 Flash if 3 is not yet in your region
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await fallbackModel.generateContent(message);
      const response = await result.response;
      
      return res.status(200).json({ 
        success: true, 
        reply: response.text(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (fallbackError) {
      console.error("All Models Failed:", fallbackError.message);
      res.status(500).json({ success: false, message: "AI Assistant is currently offline." });
    }
  }
};

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