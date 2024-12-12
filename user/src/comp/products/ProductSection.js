import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import "./ProductSection.css";

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("isAuthenticated:", !!token); // Log the authentication status
    setIsAuthenticated(!!token);
  }, []);
  

  // Fetch products based on the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/products?category=${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const categories = [
    { id: "all", name: "All Products" },
    ...Array.from(new Set(products.map((product) => product.category))).map(
      (category) => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
      })
    ),
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please log in to add products to your cart.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1, // Default quantity
          // No need to pass user manually if it's derived from token
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Product added to cart:", data.message);
        alert("Product added to cart successfully!");
      } else {
        const error = await response.json();
        console.error("Failed to add product to cart:", error.message);
        alert("Failed to add product to cart: " + error.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred while adding the product to cart.");
    }
  };
  
  
  
  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error}</div>;

  return (
    <section className="products-section">
      <div className="section-title">
        <h2>Our Products</h2>
        <p>Discover our collection of high-quality products</p>
      </div>

      {/* Category Buttons */}
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${
              selectedCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.map((product, index) => (
          <div
            className="product-card"
            key={product._id}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="product-image">
              <img
                src={`http://localhost:5000/${product.image.replace(
                  /\\/g,
                  "/"
                )}`} // Replace backslashes with forward slashes
                alt={product.name}
                className="product-image"
              />
              {product.badge && (
                <span className="product-badge">{product.badge}</span>
              )}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              {product.sizes && (
                <div className="size-badges">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className={`size-badge ${
                        size === "Out of Stock" ? "out-of-stock" : "available"
                      }`}
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}
              <div className="product-price">₹{product.price.toFixed(2)}</div>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
                disabled={!isAuthenticated} // This is important!
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
