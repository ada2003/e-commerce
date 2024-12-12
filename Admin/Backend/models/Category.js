import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure that name is required
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
