import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const CustomerProductCard = ({ product, onProductClick, onAddToCart }) => {
  return (
    <div 
      className="card product-card h-100 border-0 shadow-sm overflow-hidden"
      onClick={() => onProductClick(product)}
    >
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
        <p className="text-muted small mb-2">
          From {product.farmerName || 'Local Farm'}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-success">₹{product.customerPrice}/kg</span>
          <span className="badge bg-light text-dark">
            {product.quantity} kg available
          </span>
        </div>
        {product.farmerTaluka && product.farmerDistrict && (
          <small className="text-muted d-block mt-2">
            <i className="bi bi-geo-alt me-1"></i>
            {product.farmerTaluka}, {product.farmerDistrict}
          </small>
        )}
      </div>
      <div className="card-footer bg-white border-0">
        <button 
          className="btn btn-success w-100"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={product.quantity <= 0}
        >
          Add to Cart
        </button>
      </div>

      <style jsx>{`
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
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
      `}</style>
    </div>
  );
};

export default CustomerProductCard;