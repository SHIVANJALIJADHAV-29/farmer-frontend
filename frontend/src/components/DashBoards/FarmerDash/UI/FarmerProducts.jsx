import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const FarmerProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [image, setImage] = useState(null);

  const email = localStorage.getItem("userEmail");

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    if (image) data.append("image", image);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8085/updateProduct/${editingId}`,
          data
        );
        alert("Product updated!");
      } else {
        data.append("email", email);
        await axios.post("http://localhost:8085/addProduct", data);
        alert("Product added successfully!");
      }

      setFormData({ name: "", category: "", quantity: "", price: "" });
      setImage(null);
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error occurred");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8085/deleteProduct/${id}`);
        alert("Product deleted");
        fetchProducts();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete product");
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8085/getProducts?email=${email}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">Your Products</h3>
        <button className="btn btn-success" onClick={toggleForm}>
          ➕ {showForm ? "Close" : "Add Product"}
        </button>
      </div>

     {showForm && (
  <div className="d-flex justify-content-center">
    <div
      className="card shadow border-0 mt-3"
      style={{ maxWidth: "700px", width: "100%" }}
    >
      <div className="card-header bg-success text-white text-center fw-bold">
        {editingId ? "✏️ Edit Product" : "➕ Add New Product"}
      </div>
      <div className="card-body px-4 py-3 bg-light rounded">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* LEFT SIDE */}
            <div className="col-md-6 pe-2 border-end">
              <div className="mb-3">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="grains">Grains 🌾</option>
                  <option value="pulses">Pulses 🌱</option>
                  <option value="fruits">Fruits 🍎</option>
                  <option value="vegetables">Vegetables 🥦</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Image Upload</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={!editingId}
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-6 ps-2">
              <div className="mb-3">
                <label className="form-label fw-semibold">Quantity (kg)</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  placeholder="e.g. 50"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Price (₹/kg)</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="e.g. 30"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              {image && (
                <div className="mb-3 text-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "120px", transition: "0.3s" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-primary px-4">
              {editingId ? "💾 Update Product" : "✅ Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

      {products.length === 0 ? (
        <div className="text-center text-danger fw-semibold mt-5">
          🚫 No products added yet.
        </div>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                category={p.category}
                quantity={p.quantity}
                price={p.price}
                image={p.image}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerProducts;
