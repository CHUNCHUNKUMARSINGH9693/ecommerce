import express from 'express';
import { 
    createTicket, 
    getTickets,
    getTicketById // Useful for clicking a specific ticket to see admin replies
} from '../controllers/supportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/v1/support/create
// Triggered when a user clicks 'Submit' on the support form
router.post('/create', createTicket);
router.post('/tickets', protect, createTicket);

// @route   GET /api/v1/support
// Triggered when clicking the 'Support' section to view all tickets
router.get('/', protect, getTickets);

// @route   GET /api/v1/support/:id
// Triggered when a user clicks a specific ticket to view its details/status
router.get('/:id', protect, getTicketById);

export default router;