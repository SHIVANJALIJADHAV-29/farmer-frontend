import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerAndOrders = async () => {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        setError("No email found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const customerRes = await axios.get(`http://localhost:8085/getCustomer/${email}`);
        const customerId = customerRes.data.id;

        const ordersRes = await axios.get(`http://localhost:8085/getOrders/${customerId}`);
        const orderData = Array.isArray(ordersRes.data) ? ordersRes.data : [ordersRes.data];
        setOrders(orderData);
      } catch (err) {
        console.log(err)
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📦 Your Orders</h3>

      {error && <div className="alert alert-danger">Error: {error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-muted">
          <p>No orders found for your account.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-info">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>₹{order.price?.toFixed(2) || "0.00"}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                  <h5>  <span className={`badge ${
                      order.deliveryStatus?.toLowerCase() === "delivered" ? "bg-success" :
                      order.deliveryStatus?.toLowerCase() === "pending" ? "bg-warning text-dark" :
                      "bg-secondary"
                    }`}>
                      {order.deliveryStatus}
                    </span></h5>
                  </td>
                  <td>
                    {order.items?.length > 0 ? (
                      <ul className="list-unstyled">
                        {order.items.map((item, i) => (
                          <li key={i}>
                            {item.productName} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted">No items</span>
                    )}
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

export default CustomerOrders;
