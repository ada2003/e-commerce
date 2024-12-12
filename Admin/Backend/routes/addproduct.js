import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Product from '../models/Product.js';

const router = express.Router();

// Ensure upload directory exists
const uploadDir = 'uploads/product/images';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed (JPG, JPEG, PNG).'), false);
    }
  },
});


// Route to handle product creation
router.post('/addproduct', upload.single('image'), async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    const { name, category, price, description, sizes } = req.body;

    // Log received data
    console.log('Received data:', {
      name, category, price, description, sizes
    });

    // Check if all required fields are present
    if (!name || !category || !price || !description || !sizes) {
      return res.status(400).json({
        message: 'All fields are required.',
        receivedFields: { name, category, price, description, sizes }
      });
    }

    // Check if an image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required.' });
    }

    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (e) {
      console.error('Error parsing sizes:', e);
      return res.status(400).json({
        message: 'Invalid sizes format',
        receivedSizes: sizes
      });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      image: req.file.filename,
      category,
      price: Number(price),
      description,
      sizes: parsedSizes,
    });

    // Log the product before saving
    console.log('Attempting to save product:', newProduct);

    // Save the product to the database
    const savedProduct = await newProduct.save();
    console.log('Product saved successfully:', savedProduct);

    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      message: 'Server error. Please try again later.',
      error: error.message,
      stack: error.stack
    });
  }
});

// Route to fetch products by category
router.get('/products', async (req, res) => {
  const { category } = req.query;
  try {
    let query = {};
    if (category && category !== 'all') {
      query = { category };
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});


export default router;