import React, { useContext } from "react";
import "./CartIcon.styles.scss";
import { ReactComponent as CartIconImage } from "./../../assets/shopping-bag.svg";
import Popup from "reactjs-popup";
import CartDropdown from "./../CartDropdown/CartDropdown";
import { CartContext } from "./../../contexts/CartContext";

export default function CartIcon() {
  const { cartCount } = useContext(CartContext);
  return (
    <Popup
      trigger={
        <div className="cart-icon-container">
          <CartIconImage className="shopping-icon" />
          <span className="item-count">{cartCount}</span>
        </div>
      }
      arrow={false}
      position="bottom right"
    >
      <CartDropdown />
    </Popup>
  );
}
