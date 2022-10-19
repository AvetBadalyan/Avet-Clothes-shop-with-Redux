import React from "react";
import { useDispatch } from "react-redux";
import "./SearchBox.scss";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate()

  function inputChangeHandler(e) {
    if (pathname === "/") {
      navigate('/shop')
    }
    dispatch({ type: "FILTER", payload: e.target.value });
  }

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={inputChangeHandler}
      />
    </div>
  );
}
