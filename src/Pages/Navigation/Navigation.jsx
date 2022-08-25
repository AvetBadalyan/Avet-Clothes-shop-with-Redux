import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navigation.styles.scss";
import logo from "./../../assets/logo.jpg";
import { loginContext } from "../../contexts/user.context";

export default function Navigation() {
  const { isLoggedIn, token, setToken } = useContext(loginContext);

  // on click the log out button

  const logOutHandler = () => {
    setToken(null);
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
        </div>
      </div>
      <Outlet />
    </>
  );
}
