import React from "react";
import "./Home.styles.scss";
import CategoryItem from "./../../Components/CategoryItem/CategoryItem";
import { categories } from "./../../categories";

export default function Home() {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
}
