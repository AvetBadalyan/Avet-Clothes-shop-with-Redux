import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/common/Icon.jsx";
import { formatPrice } from "@/components/common/Price.jsx";
import CartLine from "./CartLine.jsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks.js";
import { closeCart, selectCartOpen } from "@/store/uiSlice.js";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartCount,
} from "@/store/cartSlice.js";
import "./CartDrawer.scss";

const FREE_SHIP_THRESHOLD = 150;

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const open = useAppSelector(selectCartOpen);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const count = useAppSelector(selectCartCount);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && dispatch(closeCart());
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, dispatch]);

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  const goCheckout = () => {
    dispatch(closeCart());
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="cart-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
          />
          <motion.aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32 }}
          >
            <header className="cart-drawer__head">
              <h2>
                Your bag <span>({count})</span>
              </h2>
              <button
                onClick={() => dispatch(closeCart())}
                aria-label="Close bag"
              >
                <Icon name="close" />
              </button>
            </header>

            {items.length > 0 ? (
              <>
                <div className="cart-drawer__ship">
                  {remaining > 0 ? (
                    <p>
                      You're <strong>{formatPrice(remaining)}</strong> away from
                      free shipping
                    </p>
                  ) : (
                    <p className="cart-drawer__ship-done">
                      <Icon name="check" size={16} /> You've unlocked free
                      shipping
                    </p>
                  )}
                  <div className="cart-drawer__bar">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="cart-drawer__items">
                  {items.map((item) => (
                    <CartLine key={item.key} item={item} />
                  ))}
                </div>

                <footer className="cart-drawer__foot">
                  <div className="cart-drawer__subtotal">
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <p className="cart-drawer__note">
                    Shipping & taxes calculated at checkout
                  </p>
                  <button className="btn btn--block" onClick={goCheckout}>
                    Checkout
                  </button>
                  <button
                    className="btn btn--ghost btn--block"
                    onClick={() => dispatch(closeCart())}
                  >
                    Continue shopping
                  </button>
                </footer>
              </>
            ) : (
              <div className="cart-drawer__empty">
                <Icon name="bag" size={44} />
                <h3>Your bag is empty</h3>
                <p>Discover something you'll love.</p>
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(closeCart());
                    navigate("/shop");
                  }}
                >
                  Start shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
