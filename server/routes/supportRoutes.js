import express from 'express';
import { createTicket, getTickets } from '../controllers/supportController.js';

const router = express.Router();

// This handles POST requests to http://localhost:5000/api/support/create
router.post('/create', createTicket);

// This handles GET requests to http://localhost:5000/api/support/
router.get('/', getTickets);

export default router;