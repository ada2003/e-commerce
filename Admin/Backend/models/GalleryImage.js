import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
