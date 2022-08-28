import React, { useContext } from "react";
import "./CartIcon.styles.scss";
import { ReactComponent as CartIconImage } from "./../../assets/shopping-bag.svg";
import { CartContext } from "./../../contexts/modal.context";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCartHandler = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleCartHandler}>
      <CartIconImage className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}
