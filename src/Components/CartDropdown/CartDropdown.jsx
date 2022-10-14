import React, {useEffect} from "react";
import "./CartDropdown.styles.scss";
import CartItem from "../Cart-Item/CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartDropdown() {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.cartItems);

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        Cart Items
        {cartItems && cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <button className="inverted" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </button>
    </div>
  );
}
