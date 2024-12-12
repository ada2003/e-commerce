// routes/blog.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import Blog from '../models/Blog.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/blogs'); // Save the files in 'uploads/blogs' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp for filename
    }
});

const upload = multer({ storage });

// POST API to upload blog data

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file.path; // Path to the uploaded image

        const newBlog = new Blog({
            title,
            image,
            description,
        });

        await newBlog.save();

        res.status(201).json({ message: 'Blog uploaded successfully!', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// GET API to fetch all blog data
router.get('/blogall', async (req, res) => {
    try {
        const blogs = await Blog.find();  // Fetch all blogs from the database
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
});


export default router;
