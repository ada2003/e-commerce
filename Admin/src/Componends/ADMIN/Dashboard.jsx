// src/Components/ADMIN/Dashboard.jsx
import React from 'react';
import './Dashboard.css'
const Dashboard = () => {
  return (
    <div className="dashboard-container">
    <h1 className="dashboard-heading">Dashboard</h1>
    
    {/* Summary Cards Section */}
    <div className="summary-cards">
      <div className="card">
        <h3>Total Sales</h3>
        <p>	
         120,000 INR </p>
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
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#001</td>
            <td>John Doe</td>
            <td>2024-09-21</td>
            <td>Shipped</td>
            <td>$150</td>
          </tr>
          <tr>
            <td>#002</td>
            <td>Jane Smith</td>
            <td>2024-09-20</td>
            <td>Pending</td>
            <td>$200</td>
          </tr>
          <tr>
            <td>#003</td>
            <td>David Lee</td>
            <td>2024-09-19</td>
            <td>Delivered</td>
            <td>$300</td>
          </tr>
          <tr>
            <td>#004</td>
            <td>Linda Taylor</td>
            <td>2024-09-18</td>
            <td>Shipped</td>
            <td>$250</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Dashboard;
