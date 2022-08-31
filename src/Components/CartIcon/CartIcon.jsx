import React from "react";
import "./CartIcon.styles.scss";
import { ReactComponent as CartIconImage } from "./../../assets/shopping-bag.svg";
import Popup from "reactjs-popup";
import CartDropdown from "./../CartDropdown/CartDropdown";

export default function CartIcon() {
  return (
    <Popup
      trigger={
        <div className="cart-icon-container">
          <CartIconImage className="shopping-icon" />
          <span className="item-count">0</span>
        </div>
      }
      arrow={false}
      position="bottom right"
    >
      <CartDropdown />
    </Popup>
  );
}
