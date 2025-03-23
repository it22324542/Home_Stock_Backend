import express from "express";
import { loginUser } from "../controllers/userLogInController.js";
import protectLogIn from "../middlewares/authLogInMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/profile", protectLogIn, (req, res) => {
    res.json({ message: "Protected route accessed", user: req.user });
});

export default router;
