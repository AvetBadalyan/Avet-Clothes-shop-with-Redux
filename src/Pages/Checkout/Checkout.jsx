import React from "react";
import { useContext } from "react";
import "./Checkout.styles.scss";
import { CartContext } from "./../../contexts/CartContext";
import CheckoutItem from "../../Components/Checkout-item/CheckoutItem";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      <div className="checkout-body-container">
        {cartItems.map((cartItem) => {
          return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
        })}
      </div>
      <span className="total">Total: 0</span>
    </div>
  );
}
