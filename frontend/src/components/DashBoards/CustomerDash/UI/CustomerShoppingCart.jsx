import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";

const CustomerShoppingCart = ({
  cart,
  products,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  customer,
  clearCart, // ✅ new prop to properly clear cart from parent
}) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const deliveryAddress = [
        customer?.customerAddress,
        customer?.customerTaluka,
        customer?.customerDistrict,
        customer?.customerState,
      ]
        .filter(Boolean)
        .join(", ");

      const orderData = {
        customerId: customer?.id,
        deliveryAddress,
        paymentMethod,
        totalAmount: getTotal(),
        items: cart.map((item) => {
          const product = products.find((p) => p.id === item.id);
          if (!product) {
            throw new Error(`Product not found for ID: ${item.id}`);
          }

          return {
            productId: item.id,
            productName: product.name,
            farmerId: product.farmerId,
            quantity: item.quantity,
            price: product.price,
          };
        }),
      };

      const response = await onCheckout(orderData);

      if (response?.status === 200) {
        setSuccess("Order placed successfully!");
        clearCart?.(); // ✅ use the correct clearCart function if provided
        setTimeout(() => {
          setShowCheckoutModal(false);
          setSuccess(null);
        }, 1500);
      } else {
        throw new Error(response?.data || "Failed to place order.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="card shadow-sm"
      style={{
        position: "sticky",
        top: "20px",
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto",
      }}
    >
      <div className="card-header bg-primary text-white p-2">
        <h6 className="mb-0">🛒 Cart ({cart.length})</h6>
      </div>
      <div className="card-body p-2">
        {cart.length === 0 ? (
          <p className="text-muted mb-1">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id);
              const availableQuantity = product?.quantity || 0;

              return (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex align-items-center">
                    <span
                      className="me-2"
                      style={{
                        fontSize: "0.9rem",
                        width: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product?.name || "Unnamed Product"}
                    </span>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1, availableQuantity)
                        }
                        disabled={item.quantity <= 1}
                        style={{ width: "25px", height: "25px", padding: "0" }}
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        min="1"
                        max={availableQuantity}
                        value={item.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(item.id, parseInt(e.target.value) || 1, availableQuantity)
                        }
                        style={{
                          width: "50px",
                          height: "25px",
                          textAlign: "center",
                          margin: "0 5px",
                        }}
                        className="form-control form-control-sm"
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1, availableQuantity)
                        }
                        disabled={item.quantity >= availableQuantity}
                        style={{ width: "25px", height: "25px", padding: "0" }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="fw-bold" style={{ fontSize: "0.9rem", minWidth: "70px", textAlign: "right" }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-danger p-0 ms-2"
                      onClick={() => onRemoveFromCart(item.id)}
                      style={{ fontSize: "0.8rem" }}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              );
            })}

            <hr className="my-2" />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>₹{getTotal().toFixed(2)}</span>
            </div>
            <Button
              variant="success"
              size="sm"
              className="w-100 mt-2"
              onClick={handleCheckoutClick}
            >
              Checkout
            </Button>
          </>
        )}
      </div>

      {/* Modal */}
      <Modal show={showCheckoutModal} onHide={() => !isProcessing && setShowCheckoutModal(false)}>
        <Modal.Header closeButton={!isProcessing}>
          <Modal.Title>Complete Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? (
            <Alert variant="success" className="text-center">{success}</Alert>
          ) : (
            <>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form>
                {["customerAddress", "customerTaluka", "customerDistrict", "customerState"].map(
                  (field, i) => (
                    <Form.Group key={i} className="mb-2">
                      <Form.Label>{field.replace("customer", "")}</Form.Label>
                      <Form.Control
                        type="text"
                        value={customer?.[field] || ""}
                        readOnly
                        disabled
                      />
                    </Form.Group>
                  )
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <div className="d-flex flex-column gap-2">
                    {["cod", "card", "upi"].map((method) => (
                      <Form.Check
                        key={method}
                        type="radio"
                        label={
                          method === "cod"
                            ? "Cash on Delivery"
                            : method === "card"
                            ? "Credit/Debit Card"
                            : "UPI Payment"
                        }
                        name="paymentMethod"
                        id={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        disabled={isProcessing}
                      />
                    ))}
                  </div>
                </Form.Group>

                <div className="border-top pt-3">
                  <h5>Order Summary</h5>
                  <div className="d-flex justify-content-between">
                    <span>Items ({cart.length}):</span>
                    <span>₹{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Delivery:</span>
                    <span>FREE</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mt-2">
                    <span>Total Amount:</span>
                    <span>₹{getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCheckoutModal(false)}
            disabled={isProcessing}
          >
            {success ? "Close" : "Cancel"}
          </Button>
          {!success && (
            <Button
              variant="primary"
              onClick={handleConfirmOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Order"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerShoppingCart;
