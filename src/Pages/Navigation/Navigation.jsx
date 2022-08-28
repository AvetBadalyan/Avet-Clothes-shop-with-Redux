import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Navigation.styles.scss";
import logo from "./../../assets/logo.jpg";
import { loginContext } from "../../contexts/user.context";
import CartIcon from "../../Components/CartIcon/CartIcon";

export default function Navigation() {
  const { token, setToken, isLoggedIn } = useContext(loginContext);

  // on click the log out button

  const logOutHandler = () => {
    setToken(null);
    alert("Logged Out");
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo} />
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
