import express from "express";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/inventoryController.js";

const router = express.Router();

// Create a new inventory item
router.post("/", createItem);

// Get all inventory items
router.get("/", getItems);

// Update an inventory item (add more items)
router.put("/:id", updateItem);

// Delete an inventory item
router.delete("/:id", deleteItem);

export default router;
