import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const textContent = await response.text();
        setRawResponse(textContent);
        throw new Error("Received non-JSON response from server");
      }

      const data = await response.json();
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        {rawResponse && (
          <div>
            <h2>Raw Server Response:</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {rawResponse}
            </pre>
          </div>
        )}
      </div>
    );
  }

  if (products.length === 0) return <div>No products available</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Product List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Sizes</th>
            <th style={tableHeaderStyle}>Image</th>
            <th style={tableHeaderStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={tableCellStyle}>{product.name}</td>
              <td style={tableCellStyle}>{product.category}</td>
              <td style={tableCellStyle}>${product.price.toFixed(2)}</td>
              <td style={tableCellStyle}>{product.sizes}</td>
              <td style={tableCellStyle}>
                <img 
                  src={product.image ? `/${product.image}` : 'default/image/path'} 
                  alt={product.name} 
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                />
              </td>
              <td style={tableCellStyle}>{product.description.substring(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

export default ProductList;
