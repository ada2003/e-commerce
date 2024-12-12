import express from 'express';
import multer from 'multer';
import Slide from '../models/Slider.js'; // Import Slide model
import Category from '../models/Category.js';
const router = express.Router();

// Configure Multer for file uploading, saving to 'uploads/slides' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/slides/'); // Save images in the 'uploads/slides' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// API route to handle image upload and save to MongoDB
router.post('/upload-slide', upload.single('image'), async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newSlide = new Slide({
      image_path: req.file.path.replace('uploads/', ''), // Save relative path to serve it easily
      image_name: req.file.originalname, // Original image name
    });

    await newSlide.save(); // Save to MongoDB

    res.status(201).json({ message: 'Slide uploaded successfully', slide: newSlide });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading the slide', error });
  }
});



// API route to get all slides
router.get('/slides', async (req, res) => {
  try {
    const slides = await Slide.find(); // Fetch all slides
    res.status(200).json(slides); // Return the slides in JSON format
  } catch (error) {
    console.error('Error fetching slides:', error.message);
    res.status(500).json({ message: 'Error fetching slides', error });
  }
});

// Delect API end Point 

// DELETE slide by ID
router.delete('/slides/:id', async (req, res) => {
  try {
    const slideId = req.params.id;
    const deletedSlide = await Slide.findByIdAndDelete(slideId);
    
    if (!deletedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    // Optional: You can also delete the image from the filesystem here if needed.

    res.status(200).json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the slide', error });
  }
});

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

// POST a new category
router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding category', error });
  }
});

// DELETE a category by ID
router.delete('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the category', error });
  }
});

export default router;