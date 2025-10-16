import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaShoppingBasket, 
  FaLeaf,
  FaSpinner,
  FaArrowRight
} from "react-icons/fa";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CustomerDash = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8085/getAllProducts");
      const products = response.data
        .filter(product => product.quantity > 0)
        .sort(() => 0.5 - Math.random()) // Randomize
        .slice(0, 3) // Take only 3 products
        .map(product => ({
          ...product,
          customerPrice: Math.round(product.price * 1.1)
        }));
      
      setFeaturedProducts(products);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <FaSpinner className="fa-spin me-2" size="2em" />
        <span>Loading Featured Products...</span>
      </div>
    );
  }

  return (
    <div className="customer-dashboard">
      {/* Hero Section */}
      <div className="hero-section text-center py-5 position-relative">
        <div className="container">
          <h1 className="display-5 fw-bold text-dark mb-3" data-aos="fade-down">
            Welcome, <span className="text-primary">{userName}</span>!
          </h1>
          <p className="lead text-muted mb-4" data-aos="fade-up">
            Discover fresh produce from local farmers
          </p>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" data-aos="fade-right">
            <FaLeaf className="text-success me-2" />
            Today's Special Picks
          </h2>
          <button 
            className="btn btn-link text-success text-decoration-none"
            onClick={() => navigate("/customerDashBoard/products")}
            data-aos="fade-left"
          >
            View All <FaArrowRight className="ms-1" />
          </button>
        </div>

        <div className="row g-4">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="col-md-4"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="card product-card h-100 border-0 shadow-sm overflow-hidden">
                <div 
                  className="product-image-container"
                  onClick={() => navigate(`/customerDashBoard/products/${product.id}`)}
                >
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
                    From Farmer: - {product.farmerName || 'Local Farm'}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success">₹{product.customerPrice}/kg</span>
                    <span className="badge bg-light text-dark">
                      {product.quantity} kg available
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-white border-0">
                  <button 
                    className="btn btn-success w-100"
                    onClick={() => navigate("/customerDashBoard/products")}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-light py-5 mt-4">
        <div className="container text-center" data-aos="fade-up">
          <h3 className="mb-3">Ready to explore more?</h3>
          <button 
            className="btn btn-success btn-lg px-4 rounded-pill"
            onClick={() => navigate("/customerDashBoard/products")}
          >
            <FaShoppingBasket className="me-2" /> Browse All Products
          </button>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9f5e9 100%);
        }
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .product-image-container {
          height: 200px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
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

export default CustomerDash;