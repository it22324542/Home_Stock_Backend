import InventoryItem from "../models/InventoryItem.js";
import { sendTelegramAlert } from "../utils/telegramAlert.js";

// Create a new inventory item
// export const createItem = async (req, res) => {
//   try {
//     const { userid, name, location, quantity, sublocation, image, limit } = req.body;
//     const newItem = new InventoryItem({ 
//       userid,
//       name, 
//       location, 
//       sublocation, 
//       quantity, 
//       image,
//       limit: limit || 0 
//     });
    
//     await newItem.save();
    
//     // Check if quantity is below limit right after creation
//     if (newItem.limit > 0 && newItem.quantity <= newItem.limit) {
//       const alertMessage = `🚨 LOW STOCK: ${newItem.name} (${newItem.quantity} left, limit: ${newItem.limit}) at ${newItem.location}`;
//       await sendTelegramAlert(alertMessage);
//     }
    
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating inventory item", error });
//   }
// };



import asyncHandler from 'express-async-handler';
// import createError from 'http-errors';


// Create new item with better error handling
export const createItem = asyncHandler(async (req, res) => {
  // Validate required fields
  const { name, location, quantity } = req.body;
  
  if (!name || !location || quantity === undefined) {
    throw createError(400, 'Name, location, and quantity are required');
  }

  // Create new item
  const newItem = new InventoryItem({
    name,
    location,
    sublocation: req.body.sublocation || '',
    quantity: Number(quantity),
    limit: Number(req.body.limit) || 0,
    image: req.body.image || '',
    userid: req.user?._id || 'default-user' // Add user association if using auth
  });

  // Save to database
  const savedItem = await newItem.save();
  
  res.status(201).json({
    success: true,
    data: savedItem
  });
});





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
    const { name, location, sublocation, quantity, limit, image } = req.body;

    const oldItem = await InventoryItem.findById(id);
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      id,
      { name, location, sublocation, quantity, limit, image },
      { new: true }
    );

    // Check if quantity reached limit
    if (updatedItem.limit > 0 && updatedItem.quantity <= updatedItem.limit) {
      const alertMessage = `🚨 LOW STOCK: ${updatedItem.name} (${updatedItem.quantity} left, limit: ${updatedItem.limit}) at ${updatedItem.location}`;
      await sendTelegramAlert(alertMessage);
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory item", error });
  }
};

// Delete an inventory item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await InventoryItem.findById(id);

    await InventoryItem.findByIdAndDelete(id);

    // Check if deletion affects other items with the same name
    const relatedItems = await InventoryItem.find({ name: item.name });
    if (relatedItems.length > 0) {
      const totalQuantity = relatedItems.reduce((sum, i) => sum + i.quantity, 0);
      const lowestLimit = Math.min(...relatedItems.map(i => i.limit).filter(l => l > 0));
      
      if (lowestLimit && totalQuantity <= lowestLimit) {
        const alertMessage = `⚠️ DELETION ALERT: ${item.name} total stock is now LOW (${totalQuantity} left, lowest limit: ${lowestLimit})`;
        await sendTelegramAlert(alertMessage);
      }
    }

    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item", error });
  }
};

