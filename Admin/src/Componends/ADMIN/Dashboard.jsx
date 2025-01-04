import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [orders, setOrders] = useState([]); // State to store fetched orders
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/successful-orders"); // Replace with your API endpoint
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error("Failed to fetch orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>

      {/* Summary Cards Section */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Sales</h3>
          <p>120,000 INR</p>
        </div>
        <div className="card">
          <h3>Total Products</h3>
          <p>150</p>
        </div>
        <div className="card">
          <h3>Total Users</h3>
          <p>300</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>1,200</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Full Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Pin Code</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.orderId || "N/A"}</td>
                    <td>{order.userDetails.fullName || "N/A"}</td>
                    <td>{order.userDetails.contact || "N/A"}</td>
                    <td>{order.userDetails.email || "N/A"}</td>
                    <td>{order.userDetails.pinCode || "N/A"}</td>
                    <td>{order.userDetails.address || "N/A"}</td>
                    <td>{order.amount ? `₹${order.amount}` : "N/A"}</td>
                    <td>{new Date(order.date).toLocaleDateString() || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
