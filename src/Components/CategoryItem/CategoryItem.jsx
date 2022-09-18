import React from "react";
import "./CategoryItem.styles.scss";

export default function CategoryItem({ title, imageUrl }) {
  return (
    <div
      className="category-container"
      style={{ background: `url(${imageUrl})`}}
    >
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}
