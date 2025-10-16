import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap"; // Bootstrap for consistent styling

const AdminCustomerDash = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8085/getAllCustomer")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:8085/deleteCustomer/${id}`)
        .then(() => {
          alert("Customer deleted successfully");
          // Refresh list after delete
          setCustomers(customers.filter(customer => customer.id !== id));
        })
        .catch((err) => {
          alert("Failed to delete customer");
          console.error("Delete error:", err);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">🧑‍🤝‍🧑 All Registered Customers</h2>

      {customers.length === 0 ? (
        <p className="text-center text-muted">No customers found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>State</th>
                <th>Action</th> {/* New column */}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.customerPhone}</td>
                  <td>{customer.customerAddress}</td>
                  <td>{customer.customerPincode}</td>
                  <td>{customer.customerState}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(customer.id)}
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

export default AdminCustomerDash;
