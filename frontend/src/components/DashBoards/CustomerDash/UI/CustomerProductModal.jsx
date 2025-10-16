import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

const CustomerProductModal = ({ 
  show, 
  product, 
  onClose, 
  onAddToCart 
}) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <img 
              src={`data:image/jpeg;base64,${product.image}`} 
              className="img-fluid rounded"
              alt={product.name}
            />
          </div>
          <div className="col-md-6">
            <h4>{product.name}</h4>
            <Badge bg="primary">{product.category}</Badge>
            
            <div className="mt-3">
              <h5>Product Details</h5>
              <ul className="list-unstyled">
                <li><strong>Price:</strong> ₹{product.customerPrice}/kg</li>
                <li><strong>Available Quantity:</strong> {product.quantity} kg</li>
                <li><strong>Description:</strong> {product.description || "No description available"}</li>
              </ul>
            </div>
            
            <div className="mt-4">
              <h5>Farmer Information</h5>
              <div className="card bg-light p-3">
                <ul className="list-unstyled">
                  <li><strong>Name:</strong> {product.farmerName || "Not available"}</li>
                  <li><strong>Location:</strong> {product.farmerTaluka}, {product.farmerDistrict}</li>
                  <li><strong>Address:</strong> {product.farmerAddress}</li>
                  <li><strong>Contact:</strong> {product.farmerPhone}</li>
                  <li><strong>Farm Size:</strong> {product.farmerFarmSizeInAcres} acres</li>
                  <li><strong>Crops Grown:</strong> {product.farmerCrops}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={() => {
            onAddToCart(product);
            onClose();
          }}
          disabled={product.quantity <= 0}
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerProductModal;