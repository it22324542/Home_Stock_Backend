import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, upload } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', registerUser);
router.post('/signin', loginUser);

// Protected routes (require authentication)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, upload.single('profilePhoto'), updateUserProfile);

export default router;
