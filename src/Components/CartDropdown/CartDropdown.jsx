import React, {useEffect} from "react";
import "./CartDropdown.styles.scss";
import CartItem from "../Cart-Item/CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartDropdown() {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cartSlice.cartItems);

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        <p> Your Items in Cart</p>
        {cartItems &&
          cartItems.map((item) => (
            <CartItem key={Math.random()} cartItem={item} />
          ))}
      </div>
      <button className="checkout-button" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </button>
    </div>
  );
}
