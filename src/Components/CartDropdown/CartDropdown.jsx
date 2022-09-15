import React from "react";
import "./CartDropdown.styles.scss";
import Button from "../Button/Button";
import { useContext } from "react";
import { CartContext } from "./../../contexts/CartContext";
import CartItem from "../Cart-Item/CartItem";
import { useNavigate } from "react-router-dom";

export default function CartDropdown() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        cart items
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
}
