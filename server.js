import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./src/config/dbConnect.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5000", credentials: true }));
app.use(cookieParser());

// Serve profile pictures
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
