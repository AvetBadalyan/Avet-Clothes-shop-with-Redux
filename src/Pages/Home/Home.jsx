import React, { useEffect } from "react";
import "./Home.styles.scss";
import CategoryItem from "./../../Components/CategoryItem/CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_ACTION_TYPES } from "../../store/products/products.reducer";

export default function Home() {
  const categories = useSelector((state) => state.products?.products); // []
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://avet-clothes-shop-f8267-default-rtdb.firebaseio.com/clothes.json"
    )
      .then((data) => data.json())
      .then((shop) =>
        dispatch({ type: PRODUCTS_ACTION_TYPES.SET_PRODUCTS, payload: shop })
      );
  }, []);

  useSelector((state) => state.products.products);

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem
          key={Math.random()}
          title={category.title}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
}
