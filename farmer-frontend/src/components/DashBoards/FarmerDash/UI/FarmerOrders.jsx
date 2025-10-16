import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Alert, Card, Badge } from "react-bootstrap";

const FarmerOrders = () => {
  const [farmerOrders, setFarmerOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const storedEmail = localStorage.getItem("userEmail");

  // Calculate statistics
  const confirmedOrders = farmerOrders.filter(
    order => order.deliveryStatus === "Confirmed by Farmer"
  );
  const pendingOrders = farmerOrders.filter(
    order => order.deliveryStatus !== "Confirmed by Farmer"
  );
  const totalRevenue = confirmedOrders.reduce(
    (sum, order) => sum + (order.price || 0), 0
  );

  useEffect(() => {
    const fetchFarmerIdAndOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const farmerResponse = await axios.get(
          `http://localhost:8085/getFarmer/${storedEmail}`
        );
        const farmerId = farmerResponse.data.id;

        if (farmerId) {
          const ordersResponse = await axios.get(
            `http://localhost:8085/farmer/orders/${farmerId}`
          );
          setFarmerOrders(ordersResponse.data);
        } else {
          setError("Farmer ID not found for the logged-in user.");
        }
      } catch (err) {
        console.error("Error fetching farmer orders:", err);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (storedEmail) {
      fetchFarmerIdAndOrders();
    } else {
      setError("Farmer email not found in local storage. Please log in.");
      setLoading(false);
    }
  }, [storedEmail, message]);

  const handleConfirmOrder = async (orderItemId) => {
    try {
      const response = await axios.put(
        `http://localhost:8085/farmer/orders/confirm/${orderItemId}`
      );
      setMessage({ text: response.data, variant: "success" });
    } catch (err) {
      console.error("Error confirming order:", err);
      setMessage({ 
        text: "Failed to confirm order. Please try again.", 
        variant: "danger" 
      });
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading orders...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-3 mb-5">
      <h2 className="mb-4">📦 My Customer Orders</h2>
      {message && <Alert variant={message.variant}>{message.text}</Alert>}

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="text-center">
              <Card.Title>Total Orders</Card.Title>
              <Card.Text className="display-6">
                {farmerOrders.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="text-center">
              <Card.Title>Pending Orders</Card.Title>
              <Card.Text className="display-6 text-warning">
                {pendingOrders.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 mb-3">
          <Card className="shadow-sm h-100">
            <Card.Body className="text-center">
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text className="display-6 text-success">
                ₹{totalRevenue.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Orders Tabs */}
      <ul className="nav nav-tabs" id="ordersTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="pending-tab"
            data-bs-toggle="tab"
            data-bs-target="#pending"
            type="button"
            role="tab"
          >
            Pending Orders <Badge bg="warning" className="ms-1">{pendingOrders.length}</Badge>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="confirmed-tab"
            data-bs-toggle="tab"
            data-bs-target="#confirmed"
            type="button"
            role="tab"
          >
            Confirmed Orders <Badge bg="success" className="ms-1">{confirmedOrders.length}</Badge>
          </button>
        </li>
      </ul>

      <div className="tab-content p-3 border border-top-0 rounded-bottom shadow-sm mb-5">
        {/* Pending Orders Tab */}
        <div className="tab-pane fade show active" id="pending" role="tabpanel">
          {pendingOrders.length === 0 ? (
            <p className="text-muted text-center py-4">No pending orders found.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerId}</td>
                    <td>
                      <ul className="list-unstyled">
                        {order.items.map(item => (
                          <li key={item.id}>
                            {item.productName} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>₹{order.price?.toFixed(2) || "N/A"}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        {order.items.map((item) => (
                          <Button
                            key={item.id}
                            variant="success"
                            size="sm"
                            onClick={() => handleConfirmOrder(item.id)}
                          >
                            Confirm {item.productName}
                          </Button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        {/* Confirmed Orders Tab */}
        <div className="tab-pane fade" id="confirmed" role="tabpanel">
          {confirmedOrders.length === 0 ? (
            <p className="text-muted text-center py-4">No confirmed orders yet.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {confirmedOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerId}</td>
                    <td>
                      <ul className="list-unstyled">
                        {order.items.map(item => (
                          <li key={item.id}>
                            {item.productName} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>₹{order.price?.toFixed(2) || "N/A"}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <Badge bg="success" className="fs-6">Confirmed</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerOrders;