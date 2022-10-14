import React from "react";
import { useDispatch } from "react-redux";
import "./ProductCard.styles.scss";
import { CART_ACTION_TYPES } from "./../../store/Cart/cart.actions";

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

      <button
        className="inverted"
        onClick={() =>
          dispatch({
            type: CART_ACTION_TYPES.ADD_TO_CART,
            payload: item,  
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
