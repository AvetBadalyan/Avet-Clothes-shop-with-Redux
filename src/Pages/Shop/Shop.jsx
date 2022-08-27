import React, { useContext } from "react";
import ProductCard from "../../Components/product-card/ProductCard";
import { ProductsContext } from "../../contexts/products.context";
import "./Shop.styles.scss"

export default function Shop() {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
