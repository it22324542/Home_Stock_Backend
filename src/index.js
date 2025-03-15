import express from "express";
import cors from "cors";
import 'dotenv/config';
import bdConnect from "./config/dbConnect.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    bdConnect();
}); 