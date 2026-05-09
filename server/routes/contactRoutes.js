import express from 'express';
import { 
  createContact, 
  getContacts 
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Anyone can send a message
// Private: Only Admins can see the list of messages
router
  .route('/')
  .post(createContact)
  .get(protect, admin, getContacts); 

export default router;