import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["liquid", "dairy"] },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  expirationDate: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Grocery", grocerySchema);