  import React from 'react';
  import { Form, Row, Col } from 'react-bootstrap';
  import CustomerProductCard from './CustomerProductCard';

  const CustomerProductList = ({ 
    products, 
    categories, 
    searchTerm, 
    selectedCategory, 
    onSearchChange, 
    onCategoryChange, 
    onProductClick, 
    onAddToCart 
  }) => {
    return (
      <>
        <div className="row mb-4">
          <div className="col-md-3">
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={onSearchChange}
            />
          </div>
          <div className="col-md-3">
            <Form.Select
              value={selectedCategory}
              onChange={onCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Form.Select>
          </div>
        </div>

        <div className="row">
          {products.length === 0 ? (
            <div className="text-center text-danger fw-semibold mt-5">
              🚫 No products found.
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <CustomerProductCard 
                  product={product} 
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))
          )}
        </div>
      </>
    );
  };

  export default CustomerProductList;