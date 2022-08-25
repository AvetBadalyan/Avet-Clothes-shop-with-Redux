import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Navigation.styles.scss";
import logo from "./../../assets/logo.jpg";
import { loginContext } from "../../contexts/user.context";

export default function Navigation() {
  const [userData] = useContext(loginContext);
  console.log(userData)
  const { pathname } = useLocation();

  // on click the log out button

  const logOutHandler = () => {
    userData.token = null;
    userData.isLoggedIn = false;
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
          {!userData.isLoggedIn && (
            <Link className="nav-link" to="/sing-up">
              SIGN UP/SIGN IN
            </Link>
          )}

          {userData.isLoggedIn && (
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
