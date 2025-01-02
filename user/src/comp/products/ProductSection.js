import React, { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import "./ProductSection.css";

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Fetch products based on the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/add/products?category=${selectedCategory}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);
  const toggleDescription = () => setShowFullDesc(!showFullDesc);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleImageClick = (index) => {
    setActiveImage(index);
  };
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleConfirmAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please log in to add products to your cart.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert("Product added to cart successfully!");
        handleCloseModal();
      } else {
        const error = await response.json();
        alert("Failed to add product to cart: " + error.message);
      }
    } catch (error) {
      alert("An error occurred while adding the product to the cart.");
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
        <button
          className={`category-btn ${
            selectedCategory === "all" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("all")}
        >
          All Products
        </button>
        {[...new Set(products.map((product) => product.category))].map(
          (category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image">
              <img
                src={`http://localhost:5000/uploads/product/images/${product.images[0]}`}
                alt={product.name}
              />
              {product.category && (
                <span className="product-badge">{product.category}</span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>
                {showFullDesc
                  ? product.description
                  : `${product.description.substring(0, 100)}...`}
              </p>
              <button onClick={toggleDescription} className="read-more-btn">
                {showFullDesc ? "Read Less" : "Read More"}
              </button>
              <div className="product-sizes">
                {product.sizes.map((size, index) => (
                  <span key={index} className="size-badge">
                    {size}
                  </span>
                ))}
              </div>
              <div className="product-price">₹{product.price.toFixed(2)}</div>
              <button
                className="add-to-cart"
                onClick={() => handleOpenModal(product)}
              >
                <ShoppingCart size={20} /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>
              <X size={24} />
            </button>

            <div className="modal-info">
              <div className="product-image-gallery">
                <img
                  className="main-product-image"
                  src={`http://localhost:5000/uploads/product/images/${selectedProduct.images[activeImage]}`}
                  alt={selectedProduct.name}
                />
                <div className="image-thumbnails">
                  {selectedProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/uploads/product/images/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="thumbnail-image"
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.description}</p>
              </div>

              <div>
                <strong>Sizes:</strong>
                {selectedProduct.sizes.map((size, index) => (
                  <span key={index} className="size-badge">
                    {size}
                  </span>
                ))}
              </div>
              <div className="product-price">
                Price: ₹{selectedProduct.price.toFixed(2)}
              </div>
              <button
                className="confirm-add-to-cart"
                onClick={handleConfirmAddToCart}
              >
                <ShoppingCart size={20} /> Confirm Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductSection;
