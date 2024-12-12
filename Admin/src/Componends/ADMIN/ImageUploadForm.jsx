import React, { useState } from 'react';
import './ImageUploadForm.css';

function ImageUploadForm() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/images/upload', { // Adjust the URL as necessary
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Image uploaded successfully!');
                setTitle('');
                setImage(null);
            } else {
                const errorData = await response.json();
                alert(`Failed to upload image: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        }
    };

    return (
        <form className="image-upload-form" onSubmit={handleSubmit}>
            <h2>Upload Gallery Image</h2>
            <label htmlFor="title">Image Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter image title"
                required
            />

            <label htmlFor="image">Choose Image</label>
            <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                required
            />

            <button type="submit">Upload Image</button>
        </form>
    );
}

export default ImageUploadForm;
