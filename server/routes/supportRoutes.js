import express from 'express';
import { createTicket, getTickets } from '../controllers/supportController.js';

const router = express.Router();

router.post('/create', createTicket);
router.get('/', getTickets);

export default router;