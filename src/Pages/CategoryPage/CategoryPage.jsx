import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/product-card/ProductCard";
import { SINGLE_CATEGORY_ACTION_TYPES } from "./../../store/Category/category.actions";
import "./CategoryPage.styles.scss"

export default function CategoryPage() {
  let { categoryId } = useParams();
  const dispatch = useDispatch();
  const singleCategory = useSelector(
    (state) => state.singleCategorySlice.products
  );

  console.log(categoryId, "categoryId");

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

  console.log(singleCategory, "singleCategory");

  return (
    <div className="products-container">
      <h1>{categoryId}</h1>
      <div className="products-container-content">
        {singleCategory.length > 0 &&
          singleCategory.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
