import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navigation.styles.scss";
import logo from "./../../assets/logo.jpg";

export default function Navigation() {
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
          <Link className="nav-link" to="/sing-up">
            SIGN UP/SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
