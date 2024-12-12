import React, { useState } from 'react';
import './Footer.css';


const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
    // Handle newsletter submission
  };

  return (
    <footer className="footer">
    <div className="footer-top">
      <div className="footer-section company-info">
        <h3 className="logo">RUMALA SAHIB</h3>
        <p>Sadana Brothers, the World leaders in Manufacturing Rumala Sahib, are Serving Sikh Sangat Since 1992 to More than 8000 Gurudwaras Worldwide, Providing Best Quality At Lowest Prices. We’ve The Best team in Production, Sales and Exports.</p>
        <div className="social-icons">
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      <div className="footer-section quick-links">
        <h4>Quick Links</h4>
        <ul>
          {['Home', 'Shop', 'About Us', 'Contact', 'FAQ'].map((link) => (
            <li key={link}>
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-section contact-info">
        <h4>Contact Us</h4>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>123 Shopping Street, NY 10001</span>
        </div>
        <div className="contact-item">
          <i className="fas fa-phone"></i>
          <span>+1 234 567 8900</span>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <span>contact@shopease.com</span>
        </div>
      </div>

      <div className="footer-section newsletter">
        <h4>Newsletter</h4>
        <p>Subscribe for latest updates and offers!</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>

    <div className="footer-bottom">
      <p className="copyright">© 2024 Twinkle Media Hub. All rights reserved.</p>
      <div className="made-with-love">
        <span>Made with</span>
        <i className="fas fa-heart"></i>
        <span>by Twinkle Media Hub Pvt</span>
      </div>
    </div>
  </footer>
  );
};

export default Footer;