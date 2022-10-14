import "./CartIcon.styles.scss";
import { ReactComponent as CartIconImage } from "./../../assets/shopping-bag.svg";
import Popup from "reactjs-popup";
import CartDropdown from "./../CartDropdown/CartDropdown";
import { useSelector } from "react-redux";

export default function CartIcon() {
  const { cartItems } = useSelector((state) => state.cart);

  const CartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
  return (
    <Popup
      trigger={
        <div className="cart-icon-container">
          <CartIconImage className="shopping-icon" />
          <span className="item-count">{CartCount}</span>
        </div>
      }
      arrow={false}
      position="bottom right"
    >
      <CartDropdown />
    </Popup>
  );
}
