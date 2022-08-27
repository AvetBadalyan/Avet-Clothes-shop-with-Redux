import React from "react";
import Button from "../Button/Button";
import "./ProductCard.styles.scss";

export default function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="product-card-footer">
        <div className="name">name: {name}</div>
        <div className="price">price: {price}$</div>
      </div>
      <Button buttonType="inverted">Add to Cart</Button>
    </div>
  );
}
