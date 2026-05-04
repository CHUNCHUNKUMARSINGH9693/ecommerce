import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "../config/env.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIResponse = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Initialize the model (Gemini 1.5 Flash is fast and efficient)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Optional: Add a system prompt to make it act like Utkarsh Home Support
    const prompt = `You are the AI support assistant for Utkarsh Home, a premium property consultation platform. 
    Be professional, helpful, and concise. User asked: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      reply: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ success: false, message: "AI Assistant is currently resting." });
  }
};