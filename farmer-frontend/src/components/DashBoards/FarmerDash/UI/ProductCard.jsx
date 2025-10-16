import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  id,
  name,
  category,
  quantity,
  price,
  image,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="product-card">
      <div className="card-arc">
        <img src={`data:image/jpeg;base64,${image}`} alt={name} />
      </div>
      <h2>{name}</h2>
      <div className="tags">
        <span>Category: {category}</span>
        <span>Quantity: {quantity} kg</span>
        <span>Price: ₹{price} /kg</span>
      </div>
      <div className="action-btns">
        <button
          className="btn-edit"
          onClick={() => onEdit({ id, name, category, quantity, price })}
        >
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
