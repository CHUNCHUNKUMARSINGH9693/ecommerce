import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from '../models/Product.js';

// Initialize with the key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const findMatchingProducts = async (messageText) => {
  try {
    const cleanMsg = (messageText || '').toLowerCase();
    const products = await Product.find({});
    
    // Split message into words of length > 2 to find keywords
    const queryWords = cleanMsg.split(/\s+/).filter(w => w.length > 2);
    
    return products.filter(product => {
      const name = product.name.toLowerCase();
      const cat = product.category.toLowerCase();
      
      // Match if the message contains the full name/category, or matches keywords
      if (cleanMsg.includes(name) || cleanMsg.includes(cat)) return true;
      return queryWords.some(word => name.includes(word) || cat.includes(word));
    }).slice(0, 3); // limit to top 3 products
  } catch (err) {
    console.error("Error finding matching products:", err);
    return [];
  }
};

const getLocalFallbackReply = async (userMessage, matchedProducts = []) => {
  const msg = (userMessage || '').toLowerCase();

  // 1. If we have matched products, present them locally
  if (matchedProducts.length > 0) {
    let reply = "I found these matching products in our Chunchun Home catalog:\n\n";
    matchedProducts.forEach(p => {
      reply += `- **${p.name}** - $${p.price}\n  ${p.description}\n\n`;
    });
    reply += "You can see the product details and add them to your cart directly from the cards below!";
    return reply;
  }

  // 2. Direct keyword checks for project sections
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greetings') || msg.includes('sup')) {
    return "Hello! I am your Chunchun Home AI Assistant. How can I assist you with our products, categories, or work samples today?";
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

export const getAIResponse = async (req, res) => {
  try {
    const { message, productContext } = req.body;

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
    const contextInfo = productContext 
      ? `The user is currently looking at: ${productContext.name} priced at $${productContext.price}.`
      : "";

    const prompt = `
      You are the AI Shop Assistant for 'Chunchun Home', a luxury smart home and e-commerce platform.
      Your tone is energetic, helpful, and professional.
      
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
      
      ${contextInfo}
      User Asked: ${message}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      reply: text,
      products: matchedProducts,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error) {
    console.error("Gemini AI API Call Failed. Using local fallback.");
    if (error.message.includes("403")) {
      console.error("CRITICAL: Your Gemini API Key has been reported as leaked.");
    }
    
    // Execute smart local fallback response instead of failing
    const matchedProducts = await findMatchingProducts(req.body.message);
    const reply = await getLocalFallbackReply(req.body.message, matchedProducts);
    res.status(200).json({
      success: true,
      reply,
      products: matchedProducts,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }
};