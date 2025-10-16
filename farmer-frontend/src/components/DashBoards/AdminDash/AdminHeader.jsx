import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
const AdminHeader = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-expand-lg shadow"
      style={{
        background: "linear-gradient(90deg,#1e3c72, #2a5298, #4b6cb7)",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold fs-4 text-warning"
          to="/adminDashBoard"
        >
          🌿 FarmerApp Admin Dashboard
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                className="nav-link text-warning fw-semibold"
                to="/adminDashBoard"
              >
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-warning fw-semibold"
                to="/adminDashBoard/adminFarmer"
              >
                👨‍🌾 Farmers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-warning fw-semibold"
                to="/adminDashBoard/adminCustomer"
              >
                🧑‍🤝‍🧑 Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-warning fw-semibold"
                to="/adminDashBoard/adminFarmerProducts"
              >
                🧑‍🤝‍🧑 FarmerProducts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-warning fw-semibold"
                to="/adminDashBoard/adminOrders"
              >
                📦 Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-warning fw-semibold"
                to="/adminDashBoard/adminProfit"
              >
                💰 Profit
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn d-flex align-items-center gap-2 px-3 py-2"
                onClick={handleLogout}
                style={{
                  background: "linear-gradient(135deg, #ff4d4d, #cc0000)",
                  border: "none",
                  color: "white",
                  borderRadius: "30px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 14px rgba(0, 0, 0, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0, 0, 0, 0.2)";
                }}
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
