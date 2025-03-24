import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";  // Fixed function name
import userRoutes from "./routes/userRoutes.js";  // Added user routes

dotenv.config();
connectDB();  // Connect to database before starting the server

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);  // Added user routes

app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
