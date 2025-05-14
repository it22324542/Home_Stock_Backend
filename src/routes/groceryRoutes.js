import express from "express";
import {
  createGrocery,
  getGroceries,
  updateGrocery,
  deleteGrocery
} from "../controllers/groceryController.js";

const router = express.Router();

// POST /api/groceries - Create a new grocery item
router.post("/", createGrocery);

// GET /api/groceries - Get all grocery items
router.get("/", getGroceries);

// PUT /api/groceries/:id - Update a grocery item
router.put("/:id", updateGrocery);

// DELETE /api/groceries/:id - Delete a grocery item
router.delete("/:id", deleteGrocery);

export default router;