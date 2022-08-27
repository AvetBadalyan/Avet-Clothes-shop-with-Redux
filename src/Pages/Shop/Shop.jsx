import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";

export default function Shop() {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </div>
  );
}
