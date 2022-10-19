import "./CartIcon.styles.scss";
import cartIcon from "../../assets/cart-shopping-solid.svg"
import Popup from "reactjs-popup";
import CartDropdown from "./../CartDropdown/CartDropdown";
import { useSelector } from "react-redux";

export default function CartIcon() {
  const { cartItems } = useSelector((state) => state.cartSlice);

  const CartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );
  
  return (
    <Popup
      className="popup"
      trigger={
        <div className="cart-icon-container">
          <span className="item-count">{CartCount}</span>
          <img src={cartIcon} alt="icon" />
        </div>
      }
      arrow={false}
      position="bottom right"
    >
      <CartDropdown />
    </Popup>
  );
}
