import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrderInput.scss";
import { USER_ACTION_TYPES } from "./../../store/user/user.action";
import { CART_ACTION_TYPES } from "../../store/Cart/cart.actions";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

export default function OrderInput({ cartItems, isLoggedIn }) {
  const dispatch = useDispatch();
  const formInputsValidity = useSelector(
    (state) => state.userSlice.formInputsValidity
  );


  // connect the user input data with useRef
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  // fetch with POST method in firebase the order that user made
  const submitOrderHandler = async (userData) => {
    await fetch(
      "https://avet-clothes-shop-f8267-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartItems,
        }),
      }
    );
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    // getting values from inputs with ref
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // input validation
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    dispatch({
      type: USER_ACTION_TYPES.SET_FORM_INPUTS_VALIDITY,
      payload: {
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid,
      },
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    submitOrderHandler({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });

    dispatch({ type: CART_ACTION_TYPES.CLEAR_CART });
    dispatch({ type: USER_ACTION_TYPES.SET_ORDER_SUBMITTED, payload: true });
  };

  return (
    <form onSubmit={confirmHandler} className="order-form">
      <div className={formInputsValidity.name ? "control" : "control invalid"}>
        <label>
          Your Name
          <input type="text" ref={nameInputRef} />
        </label>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>

      <div
        className={formInputsValidity.street ? "control" : "control invalid"}
      >
        <label>
          Street
          <input type="text" ref={streetInputRef} />
        </label>
        {!formInputsValidity.street && <p>Please enter a valid Street!</p>}
      </div>

      <div
        className={
          formInputsValidity.postalCode ? "control" : "control invalid"
        }
      >
        <label>
          Postal Code
          <input
            type="text"
            ref={postalCodeInputRef}
            placeholder="Must be 5 characters"
          />
        </label>
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>

      <div className={formInputsValidity.city ? "control" : "control invalid"}>
        <label>
          City
          <input type="text" ref={cityInputRef} />
        </label>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>

      {cartItems?.length > 0 && isLoggedIn && (
        <button className="order-button" onClick={submitOrderHandler}>
          ORDER
        </button>
      )}
    </form>
  );
}
