import express from 'express';
import { 
    getUserProfile, 
    updateUserProfile 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Secure all user routes
// This ensures 'req.user' is populated for every request in this file
router.use(protect);

// @route   GET & PUT /api/v1/users/profile
// GET: Triggered when a user clicks their profile page to view details
// PUT: Triggered when a user clicks 'Save Changes' after editing their profile
router.route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile);

export default router;