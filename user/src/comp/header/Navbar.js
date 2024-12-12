import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "./i1.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  // Cart state
  const [cartItems, setCartItems] = useState([]); // State for cart items

  // Fetch cart items when the user logs in or isAuthenticated changes
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCartItems(data.cart); // Update cart items state
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCartItems();
  }, [isAuthenticated]); 
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleSignUpClick = () => setShowLoginForm(true);
  const handleNewUser = () => setShowNewUserForm(true);
  const closeLoginForm = () => setShowLoginForm(false);
  const closeNewUserForm = () => setShowNewUserForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userDetails;

    if (!name || !email || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/customer-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration Successful");
        setShowNewUserForm(false);
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering new user:", error);
      alert("An error occurred while registering. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;

    try {
      const response = await fetch("http://localhost:5000/api/auth/customer-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login Successful");
        localStorage.setItem("token", result.token);
        setIsAuthenticated(true);
        setShowLoginForm(false);
      } else {
        alert(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="topnav">
        <p>Cash on delivery available in India</p>
      </div>

      {/* Main Navbar */}
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <ul className={`nav-links ${isOpen ? "active" : ""}`}>
            <li>
              <a href="#home"><i className="fas fa-home"></i> Home</a>
            </li>
            <li>
              <a href="#about"><i className="fas fa-info-circle"></i> About Us</a>
            </li>
            <li>
              <a href="#products"><i className="fas fa-box"></i> Products</a>
            </li>
            <li>
              <a href="#Blog"><i class="fa-solid fa-blog"></i>Blogs</a>
            </li>
            <li>
              <a href="#contact"><i className="fas fa-phone"></i> Contact Us</a>
            </li>
            {isAuthenticated && (
              <li>
                 <Link to="/my-cart"><i className="fas fa-shopping-cart"></i> My Cart</Link> {/* Navigate to My Cart page */}
              </li>
            )}
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
            <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          {!isAuthenticated ? (
            <button className="sign-up-button" onClick={handleSignUpClick}>
              <i className="fas fa-user-plus"></i> Sign Up
            </button>
          ) : (
            <button className="sign-up-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          )}
        </nav>
      </header>

      {/* Login Form Modal */}
      {showLoginForm && (
        <div className="modal-overlay" onClick={closeLoginForm}>
          <div className="login-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-form" onClick={closeLoginForm}>
              &times;
            </button>
            <h2>Login</h2>
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleInputChange}
            />
            <button className="login-button" onClick={handleLogin}>
              Login
            </button>
            <button className="register-button" onClick={handleNewUser}>
              Register Now
            </button>
          </div>
        </div>
      )}

      {/* New User Registration Form */}
      {showNewUserForm && (
        <div className="modal-overlay" onClick={closeNewUserForm}>
          <div className="login-form" onClick={(e) => e.stopPropagation()}>
            <button className="close-form" onClick={closeNewUserForm}>
              &times;
            </button>
            <h2>Sign Up as New User</h2>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={userDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleInputChange}
            />
            <button className="login-button" onClick={handleNewUserSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </>
  );
}
