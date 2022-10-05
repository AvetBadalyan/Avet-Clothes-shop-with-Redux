import React from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import "./ProductCard.styles.scss";

export default function ProductCard({ item }) {
  const dispatch = useDispatch();

  const { name, price, imageUrl } = item;

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="product-card-footer">
        <div className="name">name: {name}</div>
        <div className="price">price: {price}$</div>
      </div>
      <Button buttonType="inverted" >
        Add to Cart
      </Button>
    </div>
  );
}
