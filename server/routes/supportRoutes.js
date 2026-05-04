import express from 'express';
import { 
    createTicket, 
    getTickets,
    getTicketById,
    chatWithAI // Add this import from your updated controller
} from '../controllers/supportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- AI Chat Logic ---
// @route   POST /api/v1/support/ai-chat
// Triggered by the ChatBox.jsx component for real-time AI responses
router.post('/ai-chat', chatWithAI);

// --- Ticket Management ---
// @route   POST /api/v1/support/create
router.post('/create', protect, createTicket);

// @route   GET /api/v1/support
router.get('/', protect, getTickets);

// @route   GET /api/v1/support/:id
router.get('/:id', protect, getTicketById);

export default router;