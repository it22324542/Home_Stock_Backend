//new update essentials navigations

//new update login report

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";  // Fixed function name
import userRoutes from "./routes/userRoutes.js";  // Added user routes
import essentialRoutes from "./routes/essentialRoutes.js";
import loginLogRoutes from './routes/loginLogRoutes.js';

dotenv.config();
connectDB();  // Connect to database before starting the server

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);  // Added user routes
app.use("/api/users/login-logs", loginLogRoutes);
app.use("/api/essentials", essentialRoutes);

app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
