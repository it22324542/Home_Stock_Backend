import mongoose from 'mongoose';

const essentialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  threshold: {
    type: Number,
    required: true,
  },
});

const Essential = mongoose.model('Essential', essentialSchema);

// Use default export
export default Essential;
