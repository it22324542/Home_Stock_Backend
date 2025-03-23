import express from "express";
import { registerUser } from "../controllers/userSignUpController.js";
import protectSignUp from "../middlewares/authSignUpMiddleware.js";

const router = express.Router();

// Signup Route
router.post("/signup", registerUser);

// Example: If you want a protected route after signup
router.get("/profile", protectSignUp, (req, res) => {
    res.json({ message: "Protected route accessed", user: req.user });
});

export default router;
