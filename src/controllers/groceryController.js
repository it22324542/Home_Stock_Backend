import Grocery from "../models/Grocery.js";

// Create a new grocery item
export const createGrocery = async (req, res) => {
  try {
    const { name, category, quantity, expirationDate } = req.body;
    
    // Validate required fields
    if (!name || !category || !quantity || !expirationDate) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Create new item
    const newGrocery = await Grocery.create({
      name,
      category,
      quantity: Number(quantity),
      unit: category === "liquid" ? "liters" : "kilograms",
      expirationDate: new Date(expirationDate)
    });

    res.status(201).json({
      success: true,
      data: newGrocery
    });

  } catch (error) {
    console.error("Error creating grocery:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all grocery items
export const getGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.status(200).json({
      success: true,
      data: groceries
    });
  } catch (error) {
    console.error("Error fetching groceries:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update a grocery item
export const updateGrocery = async (req, res) => {
  try {
    const updatedGrocery = await Grocery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedGrocery) {
      return res.status(404).json({
        success: false,
        message: "Grocery item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedGrocery
    });
  } catch (error) {
    console.error("Error updating grocery:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a grocery item
export const deleteGrocery = async (req, res) => {
  try {
    const deletedGrocery = await Grocery.findByIdAndDelete(req.params.id);
    
    if (!deletedGrocery) {
      return res.status(404).json({
        success: false,
        message: "Grocery item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Grocery item deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting grocery:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};