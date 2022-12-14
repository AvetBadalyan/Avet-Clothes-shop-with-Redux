import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navigation.styles.scss";
import logo from "./../../assets/logo.jpg";
import CartIcon from "../../Components/CartIcon/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTION_TYPES } from "./../../store/user/user.action";
import SearchBox from "../../Components/SearchBox/SearchBox";

export default function Navigation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state?.userSlice?.token);
  const currentUser = useSelector((state) => state.userSlice.currentUser);
  // on click the log out button

  const logOutHandler = () => {
    alert("Logged Out");
    dispatch({ type: USER_ACTION_TYPES.SET_TOKEN, payload: null });
  };

  return (
    <>
      <div className="navigation">
        <div className="nav-container">
          <div className="logo-and-search-container">
            <Link className="logo-container" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <SearchBox />
          </div>

          <div className="nav-links-container">
            {!isLoggedIn && (
              <Link className="nav-link" to="/sing-up">
                SIGN UP / LOGIN
              </Link>
            )}

            {isLoggedIn && (
              <p className="current-user-info">User: {currentUser}</p>
            )}

            {isLoggedIn && (
              <Link className="nav-link" onClick={logOutHandler} to="/">
                Log out
              </Link>
            )}

            <Link className="nav-link" to="/shop">
              GO TO SHOP
            </Link>
            <div>
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
