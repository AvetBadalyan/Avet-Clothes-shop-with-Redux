import React, { useEffect } from "react";
import "./Home.styles.scss";
import CategoryItem from "./../../Components/CategoryItem/CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import { CATEGORIES_ACTION_TYPES } from "../../store/categories/categories.action";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://avet-clothes-shop-f8267-default-rtdb.firebaseio.com/categories.json"
    )
      .then((data) => data.json())
      .then((categories) =>
        dispatch({
          type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
          payload: categories,
        })
      );
  }, []);

  const categories = useSelector((state) => state.categoriesSlice.categories);

  return (
    <div className="categories-container">
      {categories.length > 0 &&
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            title={category.title}
            imageUrl={category.imageUrl}
          />
        ))}
    </div>
  );
}
