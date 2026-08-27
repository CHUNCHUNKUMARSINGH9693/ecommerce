import SupportTicket from '../models/SupportTicket.js';
import Product from '../models/Product.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const findMatchingProducts = async (messageText) => {
  try {
    const cleanMsg = (messageText || '').toLowerCase();
    const products = await Product.find({});
    
    const queryWords = cleanMsg.split(/\s+/).filter(w => w.length > 2);
    
    return products.filter(product => {
      const name = product.name.toLowerCase();
      const cat = product.category.toLowerCase();
      
      if (cleanMsg.includes(name) || cleanMsg.includes(cat)) return true;
      return queryWords.some(word => name.includes(word) || cat.includes(word));
    }).slice(0, 3);
  } catch (err) {
    console.error("Error finding matching products:", err);
    return [];
  }
};

const getLocalFallbackReply = async (userMessage, matchedProducts = []) => {
  const msg = (userMessage || '').toLowerCase();
  
  if (matchedProducts.length > 0) {
    let reply = "I found these matching products in our Chunchun Home catalog:\n\n";
    matchedProducts.forEach(p => {
      reply += `- **${p.name}** - $${p.price}\n  ${p.description}\n\n`;
    });
    reply += "You can see the product details and add them to your cart directly from the cards below!";
    return reply;
  }

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
  const { message } = req.body;

  try {
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    // 1. Fetch available products dynamically from MongoDB for AI context
    let productsList = [];
    try {
      productsList = await Product.find({}, 'name price category description');
    } catch (dbError) {
      console.error("Failed to fetch products for AI context:", dbError);
    }

    const productsContextString = productsList.map(p => 
      `- Product: "${p.name}" (ID: ${p._id}) | Category: "${p.category}" | Price: $${p.price} | Description: "${p.description}"`
    ).join('\n');

    // 2. Fetch matched products for direct card rendering
    const matchedProducts = await findMatchingProducts(message);

    // 3. Generate prompt
    const prompt = `
      You are the AI Concierge for 'Chunchun Home', a luxury smart home and e-commerce platform.
      Your tone is helpful, friendly, and professional.
      
      Current Shop Context:
      - Available Products in the store database:
      ${productsContextString || "No products currently listed."}
      
      Rules for recommending products:
      - If the user asks about or searches for a product (or category of products), you MUST suggest relevant matching products from the "Available Products" list above.
      - For every product you recommend, you MUST provide a clickable link to it in this exact markdown format: [Product Name](/product/PRODUCT_ID). Do NOT use generic links.
      
      Rules for general e-commerce inquiries:
      - If they mention order issues, settings, profile, or their cart/checkout, guide them to these specific links:
        * Shopping Cart & Checkout: [My Cart](/dashboard/cart)
        * Work Samples / Portfolio: [Work Samples](/dashboard/samples)
        * Support Ticket Portal: [Support Dashboard](/dashboard/support)
        * Referral Program: [Refer & Earn](/dashboard/referrals)
        * Resident Profile: [My Profile](/dashboard/profile)
        * Analytics/Stats: [Reports & Analytics](/dashboard/reports)
      
      - General Questions: Answer questions about smart home automation, design aesthetics, or the store politely using "Chunchun Home" as the company name.
      
      User Message: ${message}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.status(200).json({ 
      success: true, 
      reply: response.text(),
      products: matchedProducts,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error) {
    console.error("Primary Model Error:", error.message);
    
    // Updated Fallback to Gemini 3.6 Flash
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
      const result = await fallbackModel.generateContent(message);
      const response = await result.response;
      
      const matchedProducts = await findMatchingProducts(message);
      return res.status(200).json({ 
        success: true, 
        reply: response.text(),
        products: matchedProducts,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (fallbackError) {
      console.error("All Gemini API Models Failed. Using local fallback.");
      const matchedProducts = await findMatchingProducts(message);
      const reply = await getLocalFallbackReply(message, matchedProducts);
      return res.status(200).json({ 
        success: true, 
        reply,
        products: matchedProducts,
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