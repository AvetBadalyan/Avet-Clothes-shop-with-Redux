import React from "react";
import "./Checkout.styles.scss";
import CheckoutItem from "../../Components/Checkout-item/CheckoutItem";
import { useDispatch, useSelector } from "react-redux";
import { CART_ACTION_TYPES } from "../../store/Cart/cart.actions";

export default function Checkout() {
  const { cartItems } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();
  const cartTotalPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

  const checkoutHeader = ["Product", "Description", "Quantity", "Price", ""];

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
          <div className="header-block">{header}</div>
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

      {cartItems?.length > 0 && <button className="order-button">ORDER</button>}
    </div>
  );
}
