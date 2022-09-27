import React, { useContext } from "react";
import ProductCard from "../../Components/product-card/ProductCard";
import { ProductsContext } from "../../contexts/products.context";
import "./Shop.styles.scss";

export default function Shop() {
  const { products } = useContext(ProductsContext);
  console.log((products));
  return (
    <div className="products-container">
      {products &&
        products.map((product) => {
          return product.items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ));
        })}
    </div>
  );
}
