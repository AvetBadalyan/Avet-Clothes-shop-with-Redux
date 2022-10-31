import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/product-card/ProductCard";
import { SINGLE_CATEGORY_ACTION_TYPES } from "./../../store/Category/category.actions";
import "./CategoryPage.styles.scss";

export default function CategoryPage() {
  let { categoryId } = useParams();
  const dispatch = useDispatch();
  const { products, filtered } = useSelector(
    (state) => state.singleCategorySlice
  );

  useEffect(() => {
    fetch(
      `https://avet-clothes-shop-f8267-default-rtdb.firebaseio.com/clothes/${categoryId}.json`
    )
      .then((data) => data.json())
      .then((singleCategory) =>
        dispatch({
          type: SINGLE_CATEGORY_ACTION_TYPES.SET_CATEGORY,
          payload: singleCategory,
        })
      );
  }, []);

  
  return (
    <div className="products-container">
      <h1>{categoryId}</h1>
      <div className="products-container-content">
        {filtered.length === 0
          ? products.length > 0 &&
            products.map((item) => (
              <ProductCard key={Math.random()} item={item} />
            ))
          : filtered.map((item) => (
              <ProductCard key={Math.random()} item={item} />
            ))}
      </div>
    </div>
  );
}
