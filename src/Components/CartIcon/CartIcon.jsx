import React from "react";
import "./CartIcon.styles.scss";
import {ReactComponent as CartIconImage} from "./../../assets/shopping-bag.svg";

export default function CartIcon() {
  return (
    <div className="cart-icon-container">
      <CartIconImage className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}
