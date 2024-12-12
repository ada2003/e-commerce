import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadSlide.css';

export default function Category() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [productSize, setProductSize] = useState(''); // State for product size
  const [productSizes, setProductSizes] = useState([]); // State to store multiple sizes

  // Fetch categories from the database
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category form submission
  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/categories', { name: categoryName });
      console.log('Category added:', response.data);
      setCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  // Handle product size form submission
  const handleSizeSubmit = (event) => {
    event.preventDefault();
    if (productSize) {
      setProductSizes([...productSizes, productSize]); // Add new size to the list
      setProductSize(''); // Reset the input field
    }
  };

  // Handle category deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/categories/${id}`);
      console.log('Category deleted:', response.data);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="upload-slide-container">
      <h2 className="upload-slide-heading">Add New Category & Product Sizes</h2>
      
      <div className="upload-forms-row">
        {/* Category Form */}
        <div className="upload-form-container">
          <form className="upload-form" onSubmit={handleCategorySubmit}>
            <div className="form-group">
              <label htmlFor="newcategory">Add Category</label>
              <input
                type="text"
                className="form-control-file"
                id="newcategory"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary upload-btn">
              Submit
            </button>
          </form>
        </div>

        {/* Product Size Form */}
        <div className="upload-form-container">
          <form className="upload-form" onSubmit={handleSizeSubmit}>
            <div className="form-group">
              <label htmlFor="productSize">Add Product Size</label>
              <input
                type="text"
                className="form-control-file"
                id="productSize"
                value={productSize}
                onChange={(e) => setProductSize(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-secondary upload-btn">
              Add Size
            </button>
          </form>

          {/* Display added sizes */}
          <div className="product-sizes-list">
            <h4>Product Sizes:</h4>
            <ul>
              {productSizes.map((size, index) => (
                <li key={index}>{size}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Category Table */}
      <div className="uploaded-images-section">
        <h3>Categories</h3>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(category._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
