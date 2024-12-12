import React, { useState, useEffect } from "react";
import "./blog.css";
import { Editor, EditorProvider } from 'react-simple-wysiwyg';

export default function BloguploadForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog/blogall");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);

    try {
      const response = await fetch("http://localhost:5000/api/blog/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // Reset form fields
        setTitle("");
        setImage(null);
        setContent("");
      } else {
        alert("Failed to upload blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading blog");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <EditorProvider>
      <div className="form-container">
        <h2>Upload Your Blog</h2>
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label htmlFor="title">Blog Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Blog Content:</label>
            <div className="editor-container">
              <Editor
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter blog content"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit Blog
          </button>
        </form>
      </div>
      <div className="blog-list-container">
        <h2>Blog List</h2>
        <table className="blog-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Content</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${blog.image}`}
                    alt={blog.title}
                    className="blog-image"
                  />
                </td>
                <td>{blog.content}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </EditorProvider>
  );
}
