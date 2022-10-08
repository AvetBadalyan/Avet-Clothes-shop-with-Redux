import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navigation.styles.scss";
import logo from "./../../assets/logo.jpg";
import CartIcon from "../../Components/CartIcon/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTION_TYPES } from "./../../store/user/user.action";

export default function Navigation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state?.user?.token);
  // on click the log out button

  const logOutHandler = () => {
    alert("Logged Out");
    dispatch({ type: USER_ACTION_TYPES.SET_TOKEN, payload: null });
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {!isLoggedIn && (
            <Link className="nav-link" to="/sing-up">
              SIGN UP/SIGN IN
            </Link>
          )}

          {isLoggedIn && (
            <div className="logout-actions">
              <Link className="logout" onClick={logOutHandler} to="/">
                Log out
              </Link>
            </div>
          )}

          <CartIcon />
        </div>
      </div>

      <Outlet />
    </>
  );
}
