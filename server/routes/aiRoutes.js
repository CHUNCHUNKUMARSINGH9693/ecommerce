import express from 'express';
import { getAIResponse } from '../controllers/aiController.js';

const router = express.Router();

// @route   POST /api/v1/ai/chat
router.post('/chat', getAIResponse);

export default router;
