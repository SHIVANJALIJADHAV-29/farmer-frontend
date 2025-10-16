import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerProfile = () => {
  const [farmer, setFarmer] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8085/getFarmer/${email}`)
        .then((res) => {
          setFarmer(res.data);
          setFormData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching farmer data:", err);
          setLoading(false);
        });
    } else {
      console.warn("No email found in localStorage");
      setLoading(false);
    }
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8085/updateFarmer/${email}`, formData)
      .then((res) => {
        alert("✅ Profile updated successfully!");
        setFarmer(res.data);
        setFormData(res.data);
        setIsEditing(false);
      })
      .catch((err) => {
        alert("❌ Error updating profile");
        console.error(err);
      });
  };

  const handleCancel = () => {
    setFormData(farmer); 
    setIsEditing(false);
  };

  if (loading)
    return <h4 className="text-center mt-5">⏳ Loading Profile...</h4>;

  if (!farmer)
    return (
      <h4 className="text-center mt-5 text-danger">⚠️ Profile not found</h4>
    );

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded border-0">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">👨‍🌾 Farmer Profile</h3>
          {!isEditing && (
            <button
              className="btn btn-light btn-sm"
              onClick={() => setIsEditing(true)}
            > 
              ✏️ Edit
            </button>
          )}
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleUpdate}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Phone</label>
                <input
                  name="farmerPhone"
                  value={formData.farmerPhone}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Address</label>
                <input
                  name="farmerAddress"
                  value={formData.farmerAddress}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">State</label>
                <input
                  name="farmerState"
                  value={formData.farmerState}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">District</label>
                <input
                  name="farmerDistrict"
                  value={formData.farmerDistrict}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Taluka</label>
                <input
                  name="farmerTaluka"
                  value={formData.farmerTaluka}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Farm Size (Acres)</label>
                <input
                  name="farmerFarmSizeInAcres"
                  value={formData.farmerFarmSizeInAcres}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Category</label>
                <input
                  name="farmerCategories"
                  value={formData.farmerCategories}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Crops</label>
                <input
                  name="farmerCrops"
                  value={formData.farmerCrops}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="text-end">
                <button type="submit" className="btn btn-primary me-2">
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleCancel}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
