import React, { useState, useEffect } from "react";
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import './MyCart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view your cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/cart/mycart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0).toFixed(2);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Implement quantity update logic
    // This is a placeholder and should be connected to your backend
    console.log(`Update quantity for item ${itemId} to ${newQuantity}`);
  };

  const handleRemoveItem = (itemId) => {
    // Implement remove item logic
    // This is a placeholder and should be connected to your backend
    console.log(`Remove item with ID ${itemId}`);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading your cart...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <ShoppingCart size={64} color="#ff6b6b" />
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-title">
          <ShoppingCart className="cart-icon" />
          Your Cart
        </h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={64} />
            <p>Your cart is empty</p>
            <button className="continue-shopping-btn">Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.productId._id} className="cart-item">
                  <div className="cart-item-image-container">
                    <img
                      src={`http://localhost:5000/${item.productId.image.replace(/\\/g, "/")}`}
                      alt={item.productId.name}
                      className="cart-item-image"
                    />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3>{item.productId.name}</h3>
                      <button 
                        className="remove-item-btn" 
                        onClick={() => handleRemoveItem(item.productId._id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="cart-item-description">{item.productId.description}</p>
                    <div className="cart-item-footer">
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn" 
                          onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn" 
                          onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="cart-item-price">
                        ₹{(item.productId.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-summary-details">
                <span>Total</span>
                <span className="cart-total-price">₹{calculateTotal()}</span>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;