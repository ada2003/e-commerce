// src/Components/ADMIN/Panel.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import UploadSlide from "./UploadSlide";
import UploadProduct from "./UploadProduct";
import "./Panel.css"; // Style for layout
import Category from "./Category";
import BloguploadForm from "./BloguploadForm";
import Productlist from "./Productlist";
import ImageUploadForm from "./ImageUploadForm";
const Panel = () => {
  return (
    <div className="panel">
      <Sidebar />
      <div className="panel-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload-slide" element={<UploadSlide />} />
          <Route path="upload-product" element={<UploadProduct />} />
          <Route path="upload-productlist" element={<Productlist />} />
          <Route path="upload-Category" element={<Category />} />
          <Route path="upload-Gallery" element={<ImageUploadForm />} />
          <Route path="Blog" element={<BloguploadForm />} />
          <Route path="/" element={<Dashboard />} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
};

export default Panel;
