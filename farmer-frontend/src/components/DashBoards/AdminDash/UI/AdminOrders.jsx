import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { FaCheckCircle } from 'react-icons/fa'; // Import the checkmark icon
import { Button } from 'react-bootstrap'; // Import the Button component

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false); // New state for updating status

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8085/getAllCustomerOrders');
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const handleUpdateStatus = async (orderId) => {
    setUpdating(true); // Set updating state to true
    try {
      await axios.put(`http://localhost:8085/updateOrderStatus/${orderId}`, {
        deliveryStatus: 'Delivered'
      });
      // Update the order list to reflect the new status
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, deliveryStatus: 'Delivered' } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Failed to update order status. Please try again.");
    } finally {
      setUpdating(false); // Set updating state to false
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" style={{ margin: '20px' }}>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0d6efd' }}>All Customer Orders</h1>
      {orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Items</th>
              <th>Action</th> {/* New column for the update button */}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerId}</td>
                <td>{order.deliveryAddress}</td>
                <td>
                  <span className={`badge bg-${order.deliveryStatus === 'Delivered' ? 'success' : order.deliveryStatus === 'Confirmed by Farmer' ? 'info' : 'warning'}`}>
                    {order.deliveryStatus}
                  </span>
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>₹{order.price ? order.price.toFixed(2) : '0.00'}</td>
                <td>
                  <ul>
                    {order.items && order.items.length > 0 ? (
                      order.items.map(item => (
                        <li key={item.id}>
                          {item.productName} ({item.quantity} pcs) - ${item.price ? item.price.toFixed(2) : '0.00'}
                        </li>
                      ))
                    ) : (
                      <li>No items found</li>
                    )}
                  </ul>
                </td>
                <td>
                  {order.deliveryStatus === 'Confirmed by Farmer' && (
                    <Button
                      variant="success"
                      onClick={() => handleUpdateStatus(order.id)}
                      disabled={updating} // Disable button while updating
                      title="Mark as Delivered"
                      aria-label="Mark as Delivered"
                    >
                      <FaCheckCircle />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminOrders;