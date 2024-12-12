import express from 'express';
import multer from 'multer';
import { GalleryImage } from '../models/GalleryImage.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Configure multer to save files in uploads/galleryimage folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join('uploads', 'galleryimage');
        fs.mkdirSync(uploadPath, { recursive: true });  // Ensure directory exists
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/galleryimg', async (req, res) => {
    try {
        const images = await GalleryImage.find();
        console.log('Images found:', images);

        if (!images || images.length === 0) {
            return res.status(200).json([]);
        }

        // Map images to include the full path in `imagePath`
        const imagesWithPath = images.map(image => ({
            ...image.toObject(),
            imagePath: `galleryimage/${image.imagePath}` // Adding the directory
        }));

        res.status(200).json(imagesWithPath);
    } catch (error) {
        console.error('Error in /galleryimg route:', error);
        res.status(500).json({ message: 'Failed to fetch images' });
    }
});



// POST endpoint to upload an image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { title } = req.body;
        const imageData = req.file;

        // Check if image data is present
        if (!imageData) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        // Create a new gallery image document with file path
        const newImage = new GalleryImage({
            title: title,
            image: {
                data: fs.readFileSync(imageData.path),  // Store image as Buffer
                contentType: imageData.mimetype,
            },
        });

        // Save the image document to the database
        await newImage.save();
        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Failed to upload image' });
    }
});

export default router;
