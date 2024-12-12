// BlogSection.jsx
import React from 'react';
import './blogs.css';

const EnhancedBlogSlider = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React Development",
      excerpt: "Learn the fundamentals of React and start building modern web applications...",
      author: {
        name: "John Doe",
        image: "/api/placeholder/50/50",
        role: "Senior Developer"
      },
      date: "Oct 28, 2024",
      readTime: "5 min read",
      category: "Development"
    },
    {
      id: 2,
      title: "Best Practices for Writing Clean Code",
      excerpt: "Discover essential tips and techniques for writing maintainable and efficient code...",
      author: {
        name: "Jane Smith",
        image: "/api/placeholder/50/50",
        role: "Tech Lead"
      },
      date: "Oct 27, 2024",
      readTime: "8 min read",
      category: "Programming"
    },
    {
      id: 3,
      title: "Understanding State Management in React",
      excerpt: "Deep dive into various state management solutions for React applications...",
      author: {
        name: "Mike Johnson",
        image: "/api/placeholder/50/50",
        role: "Frontend Developer"
      },
      date: "Oct 26, 2024",
      readTime: "6 min read",
      category: "React"
    },
    {
      id: 3,
      title: "Understanding State Management in React",
      excerpt: "Deep dive into various state management solutions for React applications...",
      author: {
        name: "Mike Johnson",
        image: "/api/placeholder/50/50",
        role: "Frontend Developer"
      },
      date: "Oct 26, 2024",
      readTime: "6 min read",
      category: "React"
    },
    {
      id: 2,
      title: "Best Practices for Writing Clean Code",
      excerpt: "Discover essential tips and techniques for writing maintainable and efficient code...",
      author: {
        name: "Jane Smith",
        image: "/api/placeholder/50/50",
        role: "Tech Lead"
      },
      date: "Oct 27, 2024",
      readTime: "8 min read",
      category: "Programming"
    },
    {
      id: 1,
      title: "Getting Started with React Development",
      excerpt: "Learn the fundamentals of React and start building modern web applications...",
      author: {
        name: "John Doe",
        image: "/api/placeholder/50/50",
        role: "Senior Developer"
      },
      date: "Oct 28, 2024",
      readTime: "5 min read",
      category: "Development"
    }
  ];

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h1 className="glow-text">Our Blog</h1>
          <p className="subtitle">Discover the latest insights in web development</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="category-badge">{post.category}</div>
                  <h2>{post.title}</h2>
                  <p className="excerpt">{post.excerpt}</p>
                </div>
                
                <div className="card-back">
                  <div className="author-info">
                    <img src={post.author.image} alt={post.author.name} className="author-image" />
                    <div className="author-details">
                      <h3>{post.author.name}</h3>
                      <p>{post.author.role}</p>
                    </div>
                  </div>
                  <div className="post-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <button className="read-more">Read More</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedBlogSlider;