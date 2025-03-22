import InventoryItem from "../models/InventoryItem.js";

// Create a new inventory item
export const createItem = async (req, res) => {
  try {
    const { name, location, quantity } = req.body;
    const newItem = new InventoryItem({ name, location, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating inventory item", error });
  }
};

// Get all inventory items
export const getItems = async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory items", error });
  }
};

// Update an inventory item (add more items to existing quantity)
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantityToAdd } = req.body;

    // Find the item by ID
    const item = await InventoryItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the quantity
    item.quantity += quantityToAdd;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory item", error });
  }
};

// Delete an inventory item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item", error });
  }
};
