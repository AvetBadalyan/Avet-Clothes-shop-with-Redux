import React from "react";
import { useDispatch } from "react-redux";
import "./CheckoutItem.styles.scss";
import { CART_ACTION_TYPES } from './../../store/Cart/cart.actions';

export default function CheckoutItem({ cartItem }) {
  const { name, imageUrl, price, quantity, id } = cartItem;
  const dispatch = useDispatch();

  function addToCartHandler() {
    dispatch({
      type: CART_ACTION_TYPES.ADD_TO_CART,
      payload: cartItem
    })
  }
  function removeFromCartHandler() {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: id,
    })
  }
  function clearItemFromCartHandler() {
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART,
      payload: id
    })
  }

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <button
          className="arrow"
          onClick={removeFromCartHandler}
        >
          &#10094;
        </button>
        <span className="value">{quantity}</span>
        <button
          className="arrow"
          onClick={addToCartHandler}
        >
          &#10095;
        </button>
      </div>
      <div className="price">{price}</div>
      <button
        className="remove-button"
        onClick={clearItemFromCartHandler}
      >
        &#10005;
      </button>
    </div>
  );
}
