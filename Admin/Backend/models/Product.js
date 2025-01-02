// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String], 
    required: true,
    validate: [
      {
        validator: function(v) {
          return v.length >= 1 && v.length <= 5;
        },
        message: props => `Images must be between 1 and 5, got ${props.value.length}`
      }
    ]
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String], // Array of sizes
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;