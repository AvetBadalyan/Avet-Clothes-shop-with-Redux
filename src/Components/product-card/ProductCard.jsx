import React from "react";
import { useContext } from "react";
import Button from "../Button/Button";
import "./ProductCard.styles.scss";
import { CartContext } from "./../../contexts/CartContext";

export default function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="product-card-footer">
        <div className="name">name: {name}</div>
        <div className="price">price: {price}$</div>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to Cart
      </Button>
    </div>
  );
}
