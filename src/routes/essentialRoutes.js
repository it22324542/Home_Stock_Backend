import express from 'express';
const router = express.Router();
import { 
  addEssential, 
  getEssentials, 
  updateEssential, 
  deleteEssential 
} from '../controllers/essentialController.js';  // Import named exports

// Add a new essential
router.post('/api/essentials', addEssential);

// Get all essentials
router.get('/api/essentials', getEssentials);

// Update an essential by ID
router.put('/api/essentials/:id', updateEssential);

// Delete an essential by ID
router.delete('/api/essentials/:id', deleteEssential);

export default router;
