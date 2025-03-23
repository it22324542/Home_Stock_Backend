import express from "express";
import cors from "cors";
import 'dotenv/config';
import bdConnect from "./config/dbConnect.js";
import userSignUpRoutes from "./routes/userSignUpRoutes.js";
import userLogInRoutes from "./routes/userLogInRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userSignUpRoutes);
app.use("/api/users", userLogInRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    bdConnect();
}); 