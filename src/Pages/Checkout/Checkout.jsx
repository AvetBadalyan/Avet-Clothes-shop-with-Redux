import React, { useState } from "react";
import "./Checkout.styles.scss";
import CheckoutItem from "../../Components/Checkout-item/CheckoutItem";
import { useDispatch, useSelector } from "react-redux";
import { CART_ACTION_TYPES } from "../../store/Cart/cart.actions";
import OrderInput from "../../Components/order-input/OrderInput";
import { Link, useNavigate } from "react-router-dom";
import { USER_ACTION_TYPES } from "../../store/user/user.action";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cartSlice);
  const isLoggedIn = useSelector((state) => !!state?.userSlice?.token);
  const isOrderBoxVisible = useSelector(
    (state) => state.userSlice.isOrderBoxVisible
  );

  const isOrderSubmitted = useSelector(
    (state) => state.userSlice.isOrderSubmitted
  );

  const confirmHandler = () => {
    if (!isLoggedIn) {
      alert("You must log in first :) ");
      navigate("/sing-up");
    } else {
      dispatch({
        type: USER_ACTION_TYPES.SET_ORDER_BOX_VISIBLE,
        payload: true,
      });
    }
  };

  const cartTotalPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

  const checkoutHeader = ["Product", "Name", "Quantity", "Price", ""];

  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>

      {cartItems?.length > 0 && (
        <button
          className="empty-cart-button"
          onClick={() => dispatch({ type: CART_ACTION_TYPES.CLEAR_CART })}
        >
          EMPTY THE CART
        </button>
      )}

      <div className="checkout-header">
        {checkoutHeader.map((header) => (
          <div key={Math.random()} className="header-block">
            {header}
          </div>
        ))}
      </div>

      <div className="checkout-body-container">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => {
            return <CheckoutItem key={Math.random()} cartItem={cartItem} />;
          })
        ) : (
          <p className="empty-Cart-Message"> YOUR CART IS EMPTY 🧺 </p>
        )}
      </div>
      <span className="total">Total: ${cartTotalPrice}</span>

      {cartItems?.length > 0 && !isOrderBoxVisible && (
        <button className="order-button" onClick={confirmHandler}>
          Confirm
        </button>
      )}

      {isLoggedIn && isOrderBoxVisible && !isOrderSubmitted && (
        <OrderInput cartItems={cartItems} isLoggedIn={isLoggedIn} />
      )}

      {isOrderSubmitted && (
        <p className="success-message">
          Successfully sent ✔ <br></br>Thank you for your order 😇
        </p>
      )}

      {isOrderSubmitted && (
        <Link to="/shop">
          <button
            className="go-back-to-shop-button"
            onClick={() =>
              dispatch({
                type: USER_ACTION_TYPES.SET_ORDER_SUBMITTED,
                payload: false,
              })
            }
          >
            Go back to Shop
          </button>
        </Link>
      )}
    </div>
  );
}
