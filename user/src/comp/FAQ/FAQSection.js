// FAQSection.jsx
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Plus, Minus } from 'lucide-react';
import './FAQSection.css';

const FAQSection = () => {
  // FAQ data
  const faqs = [
    {
      question: "How do I get started with your service?",
      answer: "Getting started is easy! Simply create an account on our platform, choose your preferred plan, and follow our quick setup guide. Our onboarding process is designed to get you up and running in minutes."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can change your plan at any time! Your billing will be prorated automatically. Simply go to your account settings and select the new plan that best suits your needs."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer 24/7 customer support through email, live chat, and phone. Our dedicated support team is always ready to help you with any questions or issues you might encounter."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after the trial."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="pattern-overlay"></div>
      <div className="faq-wrapper">
        <div className="faq-header">
          <HelpCircle className="faq-icon" size={36} />
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Find answers to common questions about our services</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span className="question-text">{faq.question}</span>
                <span className="icon-wrapper">
                  {activeIndex === index ? (
                    <Minus className="faq-toggle-icon" />
                  ) : (
                    <Plus className="faq-toggle-icon" />
                  )}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <p>Still have questions?</p>
          <button className="contact-btn">
            Contact Support
            <ChevronDown className="contact-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;