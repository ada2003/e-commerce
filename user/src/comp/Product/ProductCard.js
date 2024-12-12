import React from 'react';
import { motion } from 'framer-motion';
import './Product.css'; // We'll create this CSS file next

const ProductCard = ({ image, name, price,Size, description }) => (
  <motion.div 
    className="product-card"
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5 }}
  >
    <img src={image} alt={name} className="product-image" />
    <h4 className="product-name">{name}</h4>
    <p className="product-price">₹{price}</p>
    <p className="product-price">Size:{Size}</p>
    <p className="product-description">{description}</p>
    <button className="add-to-cart">Add to Cart</button>
  </motion.div>
);

const ProductCategory = ({ category, products }) => (
  <div className="product-category">
    <h3 className="category-title">{category}</h3>
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  </div>
);

const ProductSection = ({ mainControls }) => {
  const categories = [
    {
      name: "Categorie Name 1",
      products: [
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Classic Rumala", Size:4, price: 99.99, description: "Traditional design with intricate embroidery" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Modern Rumala",Size:4, price: 129.99, description: "Contemporary style with vibrant colors" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Silk Rumala",Size:4, price: 149.99, description: "Luxurious silk fabric with golden threads" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Festive Rumala",Size:4, price: 179.99, description: "Special edition for Sikh festivals" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Festive Rumala",Size:4, price: 179.99, description: "Special edition for Sikh festivals" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Festive Rumala",Size:4, price: 179.99, description: "Special edition for Sikh festivals" },
      ]
     
    },
    {
      name: "Categorie Name",
      products: [
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Grand Chandoa", price: 299.99,Size:4, description: "Large size for main halls" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Compact Chandoa", price: 199.99,Size:4, description: "Ideal for smaller Gurdwaras" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Embroidered Chandoa", price: 349.99,Size:4, description: "Handcrafted with Sikh symbols" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Season Chandoa", price: 249.99,Size:4, description: "Designs change with seasons" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Festive Rumala", price: 179.99,Size:4, description: "Special edition for Sikh festivals" },
        { image: "https://via.placeholder.com/1920x1080?text=Image+2", name: "Festive Rumala", price: 179.99,Size:4, description: "Special edition for Sikh festivals" },
      
      ]
    },
  ];

  return (
    <motion.section 
      className="product-section"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <h2 className="section-title">Our Products</h2>
      {categories.map((category, index) => (
        <ProductCategory key={index} category={category.name} products={category.products} />
      ))}
    </motion.section>
  );
};

export default ProductSection;