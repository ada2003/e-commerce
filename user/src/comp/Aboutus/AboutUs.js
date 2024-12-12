import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import './AboutUs.css';
import image from './1.jfif';
// You'll need to add this image

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);
    // Define the fadeInUp animation
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      };

  return (
    <section ref={ref} className="about-us-section">
      <div className="about-us-content">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="section-title"
        >
          ABOUT US
        </motion.h2>

        <div className="content-wrapper">
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="image-container"
          >
            <img src={image} alt="Rumala Sahib" className="about-image" />
            <div className="image-overlay">
              <span>Rumala Sahib</span>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, x: 75 },
              visible: { opacity: 1, x: 0 }
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="text-content"
          >
            <h3 className="subsection-title">RUMALA SAHIB</h3>
            <p className="description">
              Rumala Sahib is the sacred cloth used to cover Guru Granth Sahib Ji. 
              Derived from 'Rumal', it signifies a protective cloth, embodying deep reverence in Sikh traditions.
            </p>
            <p className="description">
              Its influence extends beyond religious contexts, inspiring designs like the TransLink bus that honored Vaisakhi.
            </p>

            <h4 className="list-title">Significance of Rumala Sahib</h4>
            <ul className="feature-list">
              <li>
                <span className="feature-icon">🛡️</span>
                <span className="feature-text">
                  <strong>Protection:</strong> Shields Guru Granth Sahib from environmental elements
                </span>
              </li>
              <li>
                <span className="feature-icon">❤️</span>
                <span className="feature-text">
                  <strong>Devotion:</strong> Symbolizes love and dedication to Sikh faith
                </span>
              </li>
              <li>
                <span className="feature-icon">🙏</span>
                <span className="feature-text">
                  <strong>Respect:</strong> Treated with utmost reverence by the Sikh community
                </span>
              </li>
              <li>
                <span className="feature-icon">🧵</span>
                <span className="feature-text">
                  <strong>Artistry:</strong> Often embroidered with significant Sikh symbols or messages
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* New Sadana Brothers Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 1 }}
          className="content-wrapper sadana-brothers-section"
        >
          <div className="image-container">
            <img src={image} alt="Sadana Brothers" className="about-image" />
            <div className="image-overlay">
              <span>Sadana Brothers</span>
            </div>
          </div>

          <div className="text-content">
            <h3 className="subsection-title">COMPANY NAME</h3>
            <p className="description">
              Sadana brothers, having Almighty Waheguru's Blessings with the biggest Brand in Rumala Sahib industry stands tall yet humble to serve the community with its best quality. Rumala Sahib, Chandoa Sahib and complete sets for all Gurdwaras.
            </p>
            <p className="description">
              The brand has been helping Sikh Sangat in decorating Gurdwaras since 1992 and by this time touching more than 8000 Gurdwaras worldwide. Contemporary ethnic at an affordable price is Sadana brother's commitment to every customer.
            </p>

            <h4 className="list-title">Company' Legacy</h4>
            <ul className="feature-list">
              <li>
                <span className="feature-icon">🏆</span>
                <span className="feature-text">
                  <strong>Experience:</strong> Serving since 1992
                </span>
              </li>
              <li>
                <span className="feature-icon">🌍</span>
                <span className="feature-text">
                  <strong>Global Reach:</strong> Serving over 8000 Gurdwaras worldwide
                </span>
              </li>
              <li>
                <span className="feature-icon">💼</span>
                <span className="feature-text">
                  <strong>Products:</strong> Rumala Sahib, Chandoa Sahib, and complete Gurdwara sets
                </span>
              </li>
              <li>
                <span className="feature-icon">🎨</span>
                <span className="feature-text">
                  <strong>Design:</strong> Contemporary ethnic designs at affordable prices
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Add the new Product Section here */}
  
        {/* Mission & Vision Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 1.25 }}
          className="mission-vision-section"
        >
          <h3 className="section-title">Our Mission & Vision</h3>
          
          <div className="mission-vision-content">
            <motion.div 
              className="mission-box"
              variants={fadeInUp}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <h4 className="subsection-title">Our Mission</h4>
              <p className="description">
                To preserve and promote Sikh traditions by providing high-quality Rumala Sahib and other Gurdwara essentials, 
                while fostering a deep connection between the Sikh community and their sacred practices.
              </p>
            </motion.div>

            <motion.div 
              className="vision-box"
              variants={fadeInUp}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 1.75 }}
            >
              <h4 className="subsection-title">Our Vision</h4>
              <p className="description">
                To be the global leader in Rumala Sahib craftsmanship, inspiring reverence and devotion in every 
                Gurdwara worldwide, while continually innovating our designs and techniques to serve the evolving needs of the Sikh community.
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="values-list"
            variants={fadeInUp}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5, delay: 2 }}
          >
            <h4 className="list-title">Our Core Values</h4>
            <ul className="feature-list">
              <motion.li variants={fadeInUp} transition={{ delay: 2.25 }}>
                <span className="feature-icon">🙏</span>
                <span className="feature-text">
                  <strong>Devotion:</strong> Unwavering commitment to Sikh principles
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} transition={{ delay: 2.5 }}>
                <span className="feature-icon">💎</span>
                <span className="feature-text">
                  <strong>Quality:</strong> Exceptional craftsmanship in every product
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} transition={{ delay: 2.75 }}>
                <span className="feature-icon">🌱</span>
                <span className="feature-text">
                  <strong>Innovation:</strong> Continuously improving our designs and processes
                </span>
              </motion.li>
              <motion.li variants={fadeInUp} transition={{ delay: 3 }}>
                <span className="feature-icon">🤝</span>
                <span className="feature-text">
                  <strong>Community:</strong> Supporting and uniting Sikhs globally
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
      <div className="decorative-pattern"></div>
    </section>
  );
};

export default AboutUs;