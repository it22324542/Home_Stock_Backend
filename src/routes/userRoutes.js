import express from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js"; // Import upload middleware

const router = express.Router();

// Public routes (No authentication required)
router.post("/signup", registerUser);
router.post("/signin", loginUser);

// Protected routes (Require authentication)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("profilePic"), updateUserProfile);

export default router;
