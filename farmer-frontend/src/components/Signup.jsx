import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    farmerPhone: "",
    farmerAddress: "",
    farmerPincode: "",
    farmerDistrict: "",
    farmerTaluka: "",
    farmerState: "",
    farmerFarmSizeInAcres: "",
    farmerCrops: "",
    farmerCategories: "",
    customerPhone: "",
    customerAddress: "",
    customerPincode: "",
    customerDistrict: "",
    customerTaluka: "",
    customerState: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === "FARMER"
          ? {
              farmerPhone: formData.farmerPhone,
              farmerAddress: formData.farmerAddress,
              farmerPincode: formData.farmerPincode,
              farmerState: formData.farmerState,
              farmerDistrict: formData.farmerDistrict,
              farmerTaluka: formData.farmerTaluka,
              farmerFarmSizeInAcres: formData.farmerFarmSizeInAcres,
              farmerCrops: formData.farmerCrops,
              farmerCategories: formData.farmerCategories,
            }
          : {
              customerPhone: formData.customerPhone,
              customerAddress: formData.customerAddress,
              customerPincode: formData.customerPincode,
              customerState: formData.customerState,
              customerDistrict: formData.customerDistrict,
              customerTaluka: formData.customerTaluka,
            }),
      };

      await axios.post("http://localhost:8085/addUser", dataToSend);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || error.response.data);
      } else {
        alert("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="w-50 mx-auto border p-4 rounded shadow"
        autoComplete="off"
      >
        {/* Basic Fields */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 position-relative">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="FARMER">FARMER</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
        </div>

        {/* Farmer Fields */}
        {formData.role === "FARMER" && (
          <>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="farmerPhone"
                placeholder="Enter phone number"
                value={formData.farmerPhone}
                onChange={handleChange}
                required
                pattern="\d{10}"
                maxLength={10}
                title="Phone number must be exactly 10 digits"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="farmerAddress"
                placeholder="Enter your address"
                value={formData.farmerAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  name="farmerPincode"
                  placeholder="Enter pincode"
                  value={formData.farmerPincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">District</label>
                <input
                  type="text"
                  className="form-control"
                  name="farmerDistrict"
                  placeholder="Enter district"
                  value={formData.farmerDistrict}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">Taluka</label>
                <input
                  type="text"
                  className="form-control"
                  name="farmerTaluka"
                  placeholder="Enter taluka"
                  value={formData.farmerTaluka}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="farmerState"
                placeholder="Enter your state"
                value={formData.farmerState}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Farm Size (Acres)</label>
              <input
                type="number"
                className="form-control"
                name="farmerFarmSizeInAcres"
                placeholder="e.g. 2.5"
                value={formData.farmerFarmSizeInAcres}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Crops</label>
              <input
                type="text"
                className="form-control"
                name="farmerCrops"
                placeholder="e.g. Wheat, Rice"
                value={formData.farmerCrops}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Categories</label>
              <input
                type="text"
                className="form-control"
                name="farmerCategories"
                placeholder="e.g. Grains, Vegetables"
                value={formData.farmerCategories}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Customer Fields */}
        {formData.role === "CUSTOMER" && (
          <>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="customerPhone"
                placeholder="Enter phone number"
                value={formData.customerPhone}
                onChange={handleChange}
                required
                pattern="\d{10}"
                maxLength={10}
                title="Phone number must be exactly 10 digits"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="customerAddress"
                placeholder="Enter your address"
                value={formData.customerAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  name="customerPincode"
                  placeholder="Enter pincode"
                  value={formData.customerPincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">District</label>
                <input
                  type="text"
                  className="form-control"
                  name="customerDistrict"
                  placeholder="Enter district"
                  value={formData.customerDistrict}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">Taluka</label>
                <input
                  type="text"
                  className="form-control"
                  name="customerTaluka"
                  placeholder="Enter taluka"
                  value={formData.customerTaluka}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="customerState"
                placeholder="Enter your state"
                value={formData.customerState}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <p className="text-center mt-3">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
