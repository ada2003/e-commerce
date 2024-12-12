import React, { useState, useEffect } from "react";
import "./GalleryGrid.css";
import { ZoomIn, X } from "lucide-react";

const GalleryGrid = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        console.log("Fetching images...");
        const response = await fetch(
          "http://localhost:5000/api/images/galleryimg"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
    
        if (!Array.isArray(data)) {
          console.error("Data is not an array:", data);
          setError("Received invalid data format from server");
          return;
        }

        // Filter and validate images
        const validImages = data.filter((img) => img && img.imagePath);
        console.log("Valid images:", validImages);
        setImages(validImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Photo Gallery</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="grid-container">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image._id || Math.random()}
              className="grid-item"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={`http://localhost:5000/${image.imagePath}`} // This URL should resolve correctly
                alt={image.title || "Gallery image"}
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg"; // Fallback image if any error
                }}
              />

              <div className="image-overlay">
                <ZoomIn className="zoom-icon" />
              </div>
            </div>
          ))
        ) : (
          <div className="no-images">
            No images available.
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={`http://localhost:5000/${selectedImage.imagePath}`}
              alt={selectedImage.title || "Gallery image"}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
