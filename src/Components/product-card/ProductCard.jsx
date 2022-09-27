import React from "react";
import { useContext } from "react";
import Button from "../Button/Button";
import "./ProductCard.styles.scss";
import { CartContext } from "./../../contexts/CartContext";

export default function ProductCard({ item }) {
  const { name, price, imageUrl } = item;
  // const { addItemToCart } = useContext(CartContext);
  // const addProductToCart = () => addItemToCart(item);

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
