import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  sublocation: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  limit: { 
    type: Number, 
    default: 0 
  },
  image: {
    type: String, // Store the image URL
    default: "", // Default to an empty string if no image is provided
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("InventoryItem", inventoryItemSchema);

