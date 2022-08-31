import React from "react";
import "./CartDropdown.styles.scss";
import Button from "../Button/Button";

export default function CartDropdown() {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}
