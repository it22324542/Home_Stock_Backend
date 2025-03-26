import express from "express";
import cors from "cors";
import 'dotenv/config';
import bdConnect from "./config/dbConnect.js";
import essentialRoutes from "./routes/essentialRoutes.js";  // Import the routes for essentials

const app = express();

app.use(cors());
app.use(express.json());

// Use the essential routes for managing household essentials
app.use(essentialRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    bdConnect();  // Connect to the database
});
