import React, { useState, useEffect } from 'react';
import './uploadproduct.css';

const UploadProduct = () => {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [sizeInput, setSizeInput] = useState('');
  const [sizes, setSizes] = useState([]);
  const [imageError, setImageError] = useState('');
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [products, setProducts] = useState([]); // To store fetched products

  // Fetch categories from the database
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch products from the database
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data); // Store fetched products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setImageError('Image size must be less than or equal to 1 MB.');
        setProductImage(null);
      } else {
        setImageError('');
        setProductImage(file);
      }
    } else {
      setImageError('');
      setProductImage(null);
    }
  };

  const addSize = () => {
    if (sizeInput.trim() !== '') {
      setSizes([...sizes, sizeInput]);
      setSizeInput('');
    }
  };

  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('image', productImage);
      formData.append('category', productCategory);
      formData.append('price', productPrice);
      formData.append('description', productDescription);
      formData.append('sizes', JSON.stringify(sizes));

      const response = await fetch('http://localhost:5000/api/addproduct', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitStatus({ type: 'success', message: 'Product added successfully!' });
      
      // Reset form fields
      setProductName('');
      setProductImage(null);
      setProductCategory('');
      setProductPrice('');
      setProductDescription('');
      setSizes([]);

      // Reset file input
      const fileInput = document.getElementById('productImage');
      if (fileInput) fileInput.value = '';

      // Fetch updated product list
      fetchProducts();

    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      {submitStatus.message && (
        <div className={`status-message ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productImage">Product Image:</label>
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <small className="text-muted">Note: Upload Image Size 1MB only</small>
          {imageError && <div className="error-text">{imageError}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="productCategory">Product Category:</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productSize">Product Size:</label>
          <div className="size-input-group">
            <input
              type="text"
              id="productSize"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="Enter size"
            />
            <button type="button" onClick={addSize} className="add-size-btn">Add Size</button>
          </div>

          {sizes.length > 0 && (
            <div className="sizes-box">
              <h5>Added Sizes:</h5>
              <ul>
                {sizes.map((size, index) => (
                  <li key={index}>
                    {size}
                    <button type="button" onClick={() => removeSize(index)} className="remove-size-btn">Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

     
    </div>
  );
};

export default UploadProduct;
