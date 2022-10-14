import React from "react";
import ProductCard from "../../Components/product-card/ProductCard";
import "./Shop.styles.scss";
import { useSelector } from "react-redux";

export default function Shop() {
  const products = useSelector((state) => state.products?.products); // []

  return (
    <div className="products-container">
      {products.length !== 0 &&
        products.map((product) => {
          return (
            <div key={Math.random()} className="product-type">
              <h1>{product.title}</h1>
              <div className="product-type-content">
                {product.items.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
                ;
              </div>
            </div>
          );
        })}
    </div>
  );
}
