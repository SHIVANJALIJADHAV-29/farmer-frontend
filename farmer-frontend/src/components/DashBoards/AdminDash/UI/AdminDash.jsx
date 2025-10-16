import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaSeedling,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import axios from "axios";
import "./AdminDash.css";

const AdminDash = () => {
  const userName = localStorage.getItem("userName");
  const [farmerCount, setFarmerCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
    const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch all farmers
    axios
      .get("http://localhost:8085/getAllFarmers")
      .then((response) => {
        setFarmerCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching farmer count:", error);
      });

    // Fetch all customers
    axios
      .get("http://localhost:8085/getAllCustomer")
      .then((response) => {
        setCustomerCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching customer count:", error);
      });
      axios
      .get("http://localhost:8085/getAllProducts")
      .then((response) => {
        setProductCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching customer count:", error);
      });
  }, []);

  return (
    <div className="container mt-5 bounce-in">
      <div className="glass-card rounded-4 shadow-lg">
        <div className="glass-header">
          <h3 className="glow-title">🌿 Welcome, {userName}!</h3>
        </div>
        <div className="card-body p-4">
          <p className="fs-5 mb-4">
            This is your admin control center. From here you can:
          </p>

          <ul className="list-group list-group-flush mb-5">
            <Link
              to="/adminDashBoard/adminFarmer"
              className="text-decoration-none"
            >
              <li className="list-group-item list-hover">
                <FaSeedling className="me-2 text-success animate-icon" /> Manage
                Farmers
              </li>
            </Link>
            <Link
              to="/adminDashBoard/adminCustomer"
              className="text-decoration-none"
            >
              <li className="list-group-item list-hover">
                <FaUsers className="me-2 text-primary animate-icon" /> Manage
                Customers
              </li>
            </Link>
             <Link
              to="/adminDashBoard/adminFarmerProducts"
              className="text-decoration-none"
            >
              <li className="list-group-item list-hover">
                <FaUsers className="me-2 text-primary animate-icon" /> See
                Farmer-Products
              </li>
            </Link>
            <Link
              to="/adminDashBoard/adminOrders"
              className="text-decoration-none"
            >
              <li className="list-group-item list-hover">
                <FaShoppingCart className="me-2 text-warning animate-icon" />{" "}
                Track and manage Orders
              </li>
            </Link>
            <Link
              to="/adminDashBoard/adminProfit"
              className="text-decoration-none"
            >
              <li className="list-group-item list-hover">
                <FaMoneyBillWave className="me-2 text-success animate-icon" />{" "}
                Monitor Profits
              </li>
            </Link>
          </ul>

          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <Link
                to="/adminDashBoard/adminFarmer"
                className="text-decoration-none"
              >
                <div className="dashboard-card card-gradient-green">
                  <h5>👨‍🌾 Farmers</h5>
                  <p>{farmerCount}</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link
                to="/adminDashBoard/adminCustomer"
                className="text-decoration-none"
              >
                <div className="dashboard-card card-gradient-yellow">
                  <h5>🧑‍🤝‍🧑 Customers</h5>
                  <p>{customerCount}</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link
                to="/adminDashBoard/adminOrders"
                className="text-decoration-none"
              >
                <div className="dashboard-card card-gradient-blue">
                  <h5>📦 Products</h5>
                  <p>{productCount}</p>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link
                to="/adminDashBoard/adminOrders"
                className="text-decoration-none"
              >
                <div className="dashboard-card card-gradient-blue">
                  <h5>📦 Orders</h5>
                  <p>1,200+</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
