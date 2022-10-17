import React from "react";
import { useDispatch } from "react-redux";
import { PRODUCTS_ACTION_TYPES } from "../../store/products/products.reducer";
import "./SearchBox.scss";

export default function SearchBox() {
  const dispatch = useDispatch();

  function inputChangeHandler(e) {
    dispatch({ type: "FILTER", payload: e.target.value });
  }

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="search..."
        className="search"
        onChange={inputChangeHandler}
      />
    </div>
  );
}
