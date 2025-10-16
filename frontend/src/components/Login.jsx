import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8085/loginUser", loginData);
      if (res.data.success === true) {
        alert("Login Successful");
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("userEmail", loginData.email);

        if (res.data.role === "FARMER") {
          navigate("/farmerDashBoard");
        } else if (res.data.role === "CUSTOMER") {
          navigate("/customerDashBoard");
        } else if (res.data.role === "ADMIN") {
          navigate("/adminDashBoard");
        }
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto border p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input with Eye Icon */}
        <div className="mb-3 position-relative">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={loginData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="FARMER">FARMER</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <p className="text-center mt-3">
          Don't have an account? <NavLink to="/signup">Signup</NavLink>
        </p>

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
