import React from "react";
import "./CategoryItem.styles.scss";
import { Link } from "react-router-dom";

export default function CategoryItem({ title, imageUrl }) {
  return (
    <Link
      to={`${title}`}
      className="category-container"
      style={{ background: `url(${imageUrl})`, backgroundSize: "cover" }}
    >
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </Link>
  );
}
