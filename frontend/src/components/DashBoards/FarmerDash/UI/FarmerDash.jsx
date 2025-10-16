import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FarmerDash.css'; // You can create this CSS file for animations

const FarmerDash = () => {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/getProducts?email=${userEmail}`);
        setProductCount(response.data.length);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    fetchProductCount();
  }, [userEmail]);

  return (
    <div className="container my-4">
      <h2 className="text-success fw-bold mb-4 animate-pop">👋 Welcome, {userName}!</h2>

      <div className="card border-success shadow mb-4 animate-fade-in">
        <div className="card-body">
          <h4 className="card-title text-success">🧺 Total Products Listed</h4>
          <p className="fs-3 fw-bold">{productCount}</p>
          <p className="text-muted">These are the products you’ve added to your online shop.</p>
        </div>
      </div>

      <div className="card border-info shadow mb-4 animate-slide-up">
        <div className="card-body">
          <h4 className="card-title text-info">🌾 About Our Platform</h4>
          <p>
            Our farmer e-commerce website connects local farmers with direct consumers, eliminating middlemen and boosting profits.
            Easily list your crops, manage orders, and grow your business — all from your mobile or desktop!
          </p>
        </div>
      </div>

      <div className="card border-warning shadow mb-4 animate-slide-up">
        <div className="card-body">
          <h4 className="card-title text-warning">🚜 Why Sell With Us?</h4>
          <ul>
            <li>No listing fees – it's 100% free!</li>
            <li>Reach thousands of buyers in your district/state</li>
            <li>Secure order management and delivery system</li>
            <li>Real-time inventory and earnings tracking</li>
          </ul>
        </div>
      </div>

      <div className="alert alert-success mt-4 animate-pop">
        🌟 <strong>Tip:</strong> Keep your product info and images updated for better visibility and trust from customers!
      </div>
    </div>
  );
};

export default FarmerDash;
