import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLeaf } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const AdminFarmerProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8085/getAllProducts')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const uniqueCategories = [...new Set(products.map(p => p.category))];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>All Farmer Products</h2>

      {/* Filter Controls */}
      <div className="row mb-4">
        <div className="col-md-4">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <Form.Select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </div>
      </div>

      {/* Product Cards */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-danger fw-semibold mt-5">
          🚫 No products found.
        </div>
      ) : (
        <div className="admin-product-grid">
          {filteredProducts.map(product => (
            <div className="card product-card" key={product.id}>
              <div className="product-image-container">
                {product.image ? (
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="no-image-placeholder">
                    <FaLeaf className="text-success" size="3em" />
                  </div>
                )}
                <div className="product-badge">{product.category}</div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-success">₹{product.price}/kg</span>
                  <span className="badge bg-light text-dark">{product.quantity} kg</span>
                </div>

                <small className="text-muted d-block">From {product.farmerName}</small>

           

                {product.farmerTaluka && product.farmerDistrict && (
                  <small className="text-muted d-block mt-1">
                    {product.farmerTaluka}, {product.farmerDistrict}
                  </small>
                )}

                <hr />
                <p><strong>Categories:</strong> {product.farmerCategories}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Card Styles */}
      <style jsx>{`
        .admin-product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          background: #fff;
        }

        .product-image-container {
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .no-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
        }

        .product-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(40, 167, 69, 0.9);
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .card-body {
          padding: 16px;
        }

        .card-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdminFarmerProduct;
