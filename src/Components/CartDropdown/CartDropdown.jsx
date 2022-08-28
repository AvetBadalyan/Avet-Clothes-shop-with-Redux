import React, { useContext, useRef } from "react";
import "./CartDropdown.styles.scss";
import Button from "../Button/Button";
import useClickOutside from "../../customHooks/useClickOutside";
import { loginContext } from "../../contexts/user.context";

export default function CartDropdown() {
     const { toggleCartHandler } = useContext(loginContext);
    const ref = useRef(null);
    useClickOutside(ref, () => toggleCartHandler);

  return (
    <div ref={ref} className="cart-dropdown-container">
      <div className="cart-items" />
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
}
