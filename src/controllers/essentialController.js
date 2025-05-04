import Essential from '../models/essential.js';  // Correct import of the default export


// Add a new essential item
export const addEssential = async (req, res) => {
  try {
    const { name, category, quantity, threshold } = req.body;
    const newEssential = new Essential({
      name,
      category,
      quantity,
      threshold,
    });

    await newEssential.save();
    res.status(201).json(newEssential);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add essential', error });
  }
};

// Get all essentials
export const getEssentials = async (req, res) => {
  try {
    const essentials = await Essential.find();
    res.status(200).json(essentials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch essentials', error });
  }
};

// Update an essential item
export const updateEssential = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, threshold } = req.body;

    const updatedEssential = await Essential.findByIdAndUpdate(
      id,
      { name, category, quantity, threshold },
      { new: true }
    );

    if (!updatedEssential) {
      return res.status(404).json({ message: 'Essential not found' });
    }

    res.status(200).json(updatedEssential);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update essential', error });
  }
};

// Delete an essential item
export const deleteEssential = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEssential = await Essential.findByIdAndDelete(id);

    if (!deletedEssential) {
      return res.status(404).json({ message: 'Essential not found' });
    }

    res.status(200).json({ message: 'Essential deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete essential', error });
  }
};
