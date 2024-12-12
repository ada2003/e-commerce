import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './AutoImageSlider.css';
import axios from 'axios'; // Import axios for making API requests

const AutoImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]); // State to hold fetched images

  useEffect(() => {
    // Fetch images from the server
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/slides');
        console.log('API response:', response.data); // Check if this data is correct
        setImages(response.data.map(slide => `http://localhost:5000/${slide.image_path.replace(/\\/g, '/')}`));

      } catch (error) {
        console.error('Error fetching slider images:', error);
      }
    };
    
    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="auto-image-slider">
      <div 
        className="slider-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="slide">
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button onClick={goToPrevious} className="nav-button prev" aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button onClick={goToNext} className="nav-button next" aria-label="Next slide">
        <ChevronRight size={24} />
      </button>
      <div className="indicators">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoImageSlider;
