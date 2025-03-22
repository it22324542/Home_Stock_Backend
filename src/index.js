import express from "express";
import cors from "cors";
import 'dotenv/config';
import bdConnect from "./config/dbConnect.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import dbConnect from "./config/dbConnect.js";

const app = express();

//app.use(cors());
app.use(cors({
  origin: "http://localhost:5175",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));
app.use(express.json());

dbConnect();

app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  try{
    res.status(200).json({message : "hellow from backend"})
  }catch(error){
    console.log(error);
  }
});
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
}); 
