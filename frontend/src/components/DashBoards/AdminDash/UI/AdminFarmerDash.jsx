import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap"; // For styled buttons

const AdminFarmerDash = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = () => {
    axios
      .get("http://localhost:8085/getAllFarmers")
      .then((response) => {
        setFarmers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching farmers:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      axios
        .delete(`http://localhost:8085/deleteFarmer/${id}`)
        .then(() => {
          alert("Farmer deleted successfully");
          setFarmers(farmers.filter((farmer) => farmer.id !== id));
        })
        .catch((error) => {
          alert("Failed to delete farmer");
          console.error("Delete error:", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">👨‍🌾 All Registered Farmers</h2>

      {farmers.length === 0 ? (
        <p className="text-center text-muted">No farmers found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Land Size</th>
                <th>Crops</th>
                <th>Category</th>
                <th>Action</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer.id}>
                  <td>{farmer.id}</td>
                  <td>{farmer.name}</td>
                  <td>{farmer.email}</td>
                  <td>{farmer.farmerPhone}</td>
                  <td>{farmer.farmerFarmSizeInAcres} acres</td>
                  <td>{farmer.farmerCrops}</td>
                  <td>{farmer.farmerCategories}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(farmer.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFarmerDash;
