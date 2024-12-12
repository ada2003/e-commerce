import React, { useState, useEffect } from 'react';
import './UploadSlide.css'; // Assuming you have a CSS file for custom styles
import axios from 'axios'; // Import Axios for API requests

const UploadSlide = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [slides, setSlides] = useState([]); // State to store slide images

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/api/upload-slide', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
      fetchSlides(); // Fetch slides after successful upload
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Error uploading file');
    }
  };
// FetchSlider 
  const fetchSlides = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/slides'); // Fetch slides
      setSlides(response.data); // Update state with slides data
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/slides/${id}`);
        alert(res.data.message);
        fetchSlides(); // Refresh the slide list after deletion
    } catch (error) {
        console.error('Error deleting slide:', error.response ? error.response.data : error.message);
        alert('Error deleting slide: ' + (error.response ? error.response.data.message : error.message));
    }
};

  // Fetch slides when component mounts
  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div className="upload-slide-container">
      <h2 className="upload-slide-heading">Slider Upload File</h2>
      
      <div className="upload-form-container">
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imageUpload">Add Product Image</label>
            <input
              type="file"
              className="form-control-file"
              id="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary upload-btn">
            Submit
          </button>
        </form>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Image Name</th>
            <th>Uploaded At</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {slides.map((slide) => (
            <tr key={slide._id}>
              <td>
                <img src={`http://localhost:5000/${slide.image_path}`} alt={slide.image_name} style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>{slide.image_name}</td>
              <td>{new Date(slide.uploaded_at).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(slide._id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadSlide;
