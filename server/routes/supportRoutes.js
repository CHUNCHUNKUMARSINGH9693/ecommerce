// import express from 'express';
// import { createTicket } from '../controllers/supportController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/ticket', protect, createTicket);

// export default router;

import express from 'express';
import { createTicket, getTickets } from '../controllers/supportController.js';

const router = express.Router();

router.post('/create', createTicket);
router.get('/', getTickets);

export default router;