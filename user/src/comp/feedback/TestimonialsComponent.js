import React, { useState, useEffect, useCallback } from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import './TestimonialsComponent.css';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "/api/placeholder/80/80",
    text: "This product has completely transformed pojdaoipsjdoiajs cjkd j tfjinUJNSJNNRJNNMFJHNRJFNJ IFNJIOJASOIJoiOIOIoiOIFOIAOIFIOASDFH KJVKJSNUSDFKJS FOHJKDFOSDONFHODISFOISODIHFOIDSFIODOSIFIOH OI IOFJHB FOKLJASIONASDKLFHJ JFMNFJNFJ JPAJSnoihsdoifsdfujbas dibnsodbhasndnsdn how we operate. The efficiency gains are remarkable!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Lead",
    image: "/api/placeholder/80/80",
    text: "Outstanding support team and fantastic features. Couldn't be happier with the results.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Product Manager",
    image: "/api/placeholder/80/80",
    text: "The best decision we made this year. The ROI has been incredible.",
    rating: 5
  }
];

const TestimonialsComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <Star key={index} className="star" />
    ));
  };

  const createStarParticle = useCallback((e, button) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'star-particle';
      
      const tx = (Math.random() - 0.5) * 100;
      const ty = (Math.random() - 0.5) * 100;
      
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      button.appendChild(particle);
      
      particle.style.animation = 'starAnimation 0.8s ease-out forwards';
      
      setTimeout(() => particle.remove(), 800);
    }
  }, []);

  const handleReviewClick = () => {
    // Replace with your Google Review link
    window.open('https://g.page/review/your-business-id', '_blank');
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-wrapper">
        <h2 className="testimonials-title">What Our Clients Say</h2>
        
        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card ${activeIndex === index ? 'active' : ''}`}
              style={{ display: activeIndex === index ? 'block' : 'none' }}
            >
              <div className="profile-container">
                <div className="profile-image-wrapper">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="profile-image"
                  />
                  <div className="quote-icon">
                    <Quote />
                  </div>
                </div>
                
                <div>
                  <h3 className="profile-name">{testimonial.name}</h3>
                  <p className="profile-role">{testimonial.role}</p>
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="navigation-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`dot ${activeIndex === index ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="google-review-container">
          <button
            className="google-review-button"
            onClick={handleReviewClick}
            onMouseMove={(e) => createStarParticle(e, e.currentTarget)}
          >
            <div className="button-content">
              <div className="stars-animation" />
              <Star className="w-6 h-6" />
              <span>Leave a Google Review</span>
              <ExternalLink className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsComponent;