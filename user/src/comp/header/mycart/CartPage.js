import React, { useState, useEffect } from "react";
import { Trash2, ShoppingCart,MessageCircle, Plus, Minus, ArrowRight } from "lucide-react";
import "./MyCart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleWhatsAppClick = () => {
    window.open("q1", "_blank");
  };


  // Fetch cart items when component mounts
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);
  };

  // Update quantity
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/cart/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      alert("Failed to update quantity.");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/cart/remove/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (error) {
      alert("Failed to remove item from cart.");
    }
  };

  if (loading) return <div>Loading your cart...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={`http://localhost:5000/uploads/product/images/${item.productId.images[0]}`}
                alt={item.productId.name}
              />
              <div>
                <h3>{item.productId.name}</h3>
                <p>{item.productId.description}</p>
                <p>Price: ₹{item.productId.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-total">
             
          <div className="custom-order-card">
        <div className="custom-order-content">
          <h3 className="custom-order-title">Need a Custom Size Romala?</h3>
          <p className="custom-order-description">Contact us on WhatsApp for personalized sizing options</p>
          <button className="whatsapp-button" onClick={handleWhatsAppClick}>
            <MessageCircle />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    
    



            <h3>Total: ₹{calculateTotal()}</h3>
            <button className="place-order-button">
              Place Order <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
