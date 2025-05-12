import express from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    updatePassword,
    logout
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes (No authentication required)
router.post("/signup", registerUser);
router.post("/signin", loginUser);

// Protected routes (Require authentication)
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, upload.single("profilePic"), updateUserProfile);
router.put("/password", auth, updatePassword);
router.post("/logout", auth, logout);

export default router;
