// ContactForm.jsx
import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Here you would typically handle the form submission
  };

  return (
    <div className="contact-container">
      <div className="pattern-overlay"></div>
      <div className="form-wrapper">
        <h2 className="form-title">Get in Touch</h2>
        <p className="form-subtitle">We'd love to hear from you!</p>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="form-input"
            />
            <span className="input-highlight"></span>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="form-input"
            />
            <span className="input-highlight"></span>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
              className="form-input"
            />
            <span className="input-highlight"></span>
          </div>

          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              className="form-input form-textarea"
            ></textarea>
            <span className="input-highlight"></span>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
            <span className="btn-overlay"></span>
          </button>

          {submitted && (
            <div className="success-message">
              Thank you! Your message has been sent successfully.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;