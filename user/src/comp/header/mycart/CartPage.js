import React, { useState, useEffect } from "react";
import { Trash2, Minus, MessageCircle, Plus, ArrowRight } from "lucide-react";
import "./MyCart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    pinCode: "",
    address: "",
  });

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

        if (!response.ok) throw new Error("Failed to fetch cart items");
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

  const calculateTotal = () =>
    cartItems
      .reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setShowForm(true);
  };
// CartPage.js - Updated handlePayment function

const handlePayment = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to place an order.");
    return;
  }

  // Validate form data
  if (!formData.fullName || !formData.contactNumber || !formData.email || !formData.pinCode || !formData.address) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    // Create order and get Razorpay order ID
    const orderResponse = await fetch(
      "http://localhost:5000/api/cart/create-order",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(errorData.message || "Failed to create order");
    }

    const orderData = await orderResponse.json();

    // Initialize Razorpay
    const options = {
      key: "rzp_test_3XhUqbOcKSBLLR", // You might want to move this to an environment variable
      amount: orderData.amount, // Use the amount returned from the server
      currency: "INR",
      name: "Romala",
      description: "Purchase Transaction",
      order_id: orderData.id,
      handler: async function (response) {
        try {
          const verificationResponse = await fetch(
            "http://localhost:5000/api/cart/verify-payment",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userDetails: formData,
                amount: orderData.cartAmount,
                orderId: orderData.id
              }),
            }
          );

          if (!verificationResponse.ok) {
            const errorData = await verificationResponse.json();
            throw new Error(errorData.message || "Payment verification failed");
          }

          const result = await verificationResponse.json();
          alert("Order placed successfully!");
          setCartItems([]);
          setShowForm(false);
        } catch (error) {
          alert("Payment verification failed: " + error.message);
        }
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.contactNumber,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    alert("Failed to initiate payment: " + error.message);
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
          {/* Cart Items */}
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
                  <button>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button>
                    <Plus size={16} />
                  </button>
                </div>
                <button className="remove-button">
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart Total and Form */}
          <div className="cart-total">
            <h3>Total: ₹{calculateTotal()}</h3>
            {!showForm ? (
              <button className="place-order-button" onClick={handlePlaceOrder}>
                Place Order <ArrowRight size={20} />
              </button>
            ) : (
              <form className="order-form" onSubmit={handlePayment}>
                <h3>Shipping Details</h3>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={formData.pinCode}
                  onChange={handleFormChange}
                  required
                />
                <textarea
                  name="address"
                  placeholder="Detailed Address"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                />
                <button type="submit">
                  Proceed to Payment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
