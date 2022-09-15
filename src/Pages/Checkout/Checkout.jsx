import React from "react";
import { useContext } from "react";
import "./Checkout.styles.scss";
import { CartContext } from "./../../contexts/CartContext";

export default function Checkout() {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  return (
    <div>
      <h1>Checkout Page</h1>
      <div>
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <p onClick={() => removeItemFromCart(cartItem)}>decrement</p>
              <span>{quantity}</span>
              <p onClick={() => addItemToCart(cartItem)}>increment</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
