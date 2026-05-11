import { GoogleGenerativeAI } from "@google/generative-ai";
// Ensure your env config is properly loading process.env variables
import env from "../config/env.js"; 

// Initialize with the NEW key you generated in Google AI Studio
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (req, res) => {
  try {
    const { message, productContext } = req.body;

    // 1. Validation: Check if the key exists before calling Google
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: "API Key missing. Please check your .env file." 
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. Enhanced System Prompt
    // If the user is looking at a specific product, we pass that info here
    const contextInfo = productContext 
      ? `The user is currently looking at: ${productContext.name} priced at $${productContext.price}.`
      : "";

   const prompt = `
  You are the AI Shop Assistant for an e-commerce platform. 
  Your tone is energetic, helpful, and professional. 
  
  Current Context:
  - If the user asks about products, help them explore the "Shop Collection".
  - If they mention an order, guide them toward their dashboard.
  
  User Asked: ${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      reply: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

  } catch (error) {
    // Handle the specific leaked key error gracefully in the console
    if (error.message.includes("403")) {
      console.error("CRITICAL: Your Gemini API Key has been reported as leaked.");
    } else {
      console.error("AI Error:", error);
    }

    res.status(500).json({ 
      success: false, 
      message: "AI Assistant is temporarily unavailable. Please try again later." 
    });
  }
};