import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Assuming you style the sidebar in this CSS file

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic if necessary (e.g., clearing tokens or session)
    // After logging out, redirect to login page
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul className="sidebar-links">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/upload-slide">Upload Slide</Link></li>
        <li><Link to="/admin/upload-Category">Upload Category</Link></li>
        <li><Link to="/admin/upload-product">Upload Product</Link></li>
        <li><Link to="/admin/upload-productList">Upload Product List</Link></li>
        <li><Link to="/admin/upload-Gallery">Upload Gallery images</Link></li>
        <li><Link to="/admin/Blog">Upload Blog</Link></li>

      </ul>

      {/* Log Out Button at the bottom */}
      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
