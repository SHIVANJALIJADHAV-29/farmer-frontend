// CustomerProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8085/getCustomer/${email}`)
        .then((res) => {
          setCustomer(res.data);
          setFormData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching customer data:", err);
          setLoading(false);
        });
    }
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8085/updateCustomer/${email}`, formData)
      .then((res) => {
        alert("✅ Profile updated successfully!");
        setCustomer(res.data);
        setFormData(res.data);
        setIsEditing(false);
      })
      .catch((err) => {
        alert("❌ Error updating profile");
        console.error(err);
      });
  };

  if (loading) return <h4 className="text-center mt-5">⏳ Loading Profile...</h4>;
  if (!customer) return <h4 className="text-center mt-5 text-danger">⚠️ Profile not found</h4>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg rounded border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">👤 Customer Profile</h3>
          <button
            className="btn btn-light btn-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "❌ Cancel" : "✏️ Edit"}
          </button>
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
                  className="form-control"
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Phone</label>
                <input
                  name="customerPhone"
                  value={formData.customerPhone || ''}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Address</label>
                <input
                  name="customerAddress"
                  value={formData.customerAddress || ''}
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
                  name="customerState"
                  value={formData.customerState || ''}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">District</label>
                <input
                  name="customerDistrict"
                  value={formData.customerDistrict || ''}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Taluka</label>
                <input
                  name="customerTaluka"
                  value={formData.customerTaluka || ''}
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
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;