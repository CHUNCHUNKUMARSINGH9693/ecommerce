import SupportTicket from '../models/SupportTicket.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getLocalFallbackReply = (userMessage) => {
  const msg = (userMessage || '').toLowerCase();
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greetings') || msg.includes('sup')) {
    return "Hello! I am your Chunchun Home Concierge. How can I assist you with our luxury automated systems, e-commerce products, or work samples today?";
  }
  
  if (msg.includes('work') || msg.includes('sample') || msg.includes('portfolio') || msg.includes('project') || msg.includes('gallery') || msg.includes('done') || msg.includes('design') || msg.includes('installation')) {
    return "We take pride in our premium integrations. You can view our luxury home theater systems, automated lighting controls, and designer furniture installations here: [View Work Samples](/dashboard/samples).";
  }
  
  if (msg.includes('product') || msg.includes('item') || msg.includes('shop') || msg.includes('catalog') || msg.includes('buy') || msg.includes('store') || msg.includes('price')) {
    return "We offer a wide range of state-of-the-art smart home components, luxury lighting, and modern decor. You can browse and order from our collection directly: [Browse Products](/dashboard).";
  }
  
  if (msg.includes('cart') || msg.includes('checkout') || msg.includes('order') || msg.includes('pay') || msg.includes('purchase')) {
    return "Ready to finalize your selection? You can review your cart items and proceed to our secure checkout here: [Go to Cart](/dashboard/cart).";
  }
  
  if (msg.includes('support') || msg.includes('help') || msg.includes('ticket') || msg.includes('problem') || msg.includes('issue') || msg.includes('contact') || msg.includes('email')) {
    return "Our support team is here to help you resolve any queries. You can submit a support ticket directly to our queue: [Submit Support Ticket](/dashboard/support).";
  }
  
  if (msg.includes('profile') || msg.includes('account') || msg.includes('user') || msg.includes('settings') || msg.includes('login')) {
    return "You can manage your account settings, saved addresses, and profile details here: [My Profile](/dashboard/profile).";
  }
  
  if (msg.includes('referral') || msg.includes('reward') || msg.includes('point') || msg.includes('invite') || msg.includes('earn')) {
    return "Earn rewards by inviting your friends! Check your points and referral links here: [Referrals & Rewards](/dashboard/referrals).";
  }
  
  if (msg.includes('report') || msg.includes('analytics') || msg.includes('stat') || msg.includes('sale')) {
    return "View your shopping statistics, monthly expenses, and activity reports here: [Analytics Reports](/dashboard/reports).";
  }
  
  return "Thank you for reaching out! To best assist you with your request, could you please specify if you're interested in our [Product Catalog](/dashboard), [Work Samples](/dashboard/samples), [Support Ticket Portal](/dashboard/support), or managing your [Shopping Cart](/dashboard/cart)?";
};

export const chatWithAI = async (req, res) => {
  const { message } = req.body; // Move this outside the try block for fallback access

  try {
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    // UPDATED: Using the current Gemini 3.6 Flash model
   const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
   const prompt = `
     You are the AI Concierge for 'Chunchun Home'. 
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
    
    // Updated Fallback to Gemini 3.6 Flash
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
      const result = await fallbackModel.generateContent(message);
      const response = await result.response;
      
      return res.status(200).json({ 
        success: true, 
        reply: response.text(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (fallbackError) {
      console.error("All Gemini API Models Failed. Using local fallback.");
      const reply = getLocalFallbackReply(message);
      return res.status(200).json({ 
        success: true, 
        reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
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