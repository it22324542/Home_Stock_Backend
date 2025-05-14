//new update essentials navigations

//new update login report

import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";  // Added user routes
import essentialRoutes from "./routes/essentialRoutes.js";
import loginLogRoutes from './routes/loginLogRoutes.js';


import "dotenv/config";
import dbConnect from "./config/dbConnect.js";
import groceryRoutes from "./routes/groceryRoutes.js";

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5175"], // Allow both ports
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);  // Added user routes
app.use("/api/users/login-logs", loginLogRoutes);
app.use("/api/essentials", essentialRoutes);

app.use('/uploads', express.static('uploads'));


// Connect to MongoDB
dbConnect();

// Routes
app.use("/api/groceries", groceryRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
    
}); 


