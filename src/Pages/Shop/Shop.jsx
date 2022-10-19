import React, { useEffect } from "react";
import ProductCard from "../../Components/product-card/ProductCard";
import "./Shop.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_ACTION_TYPES } from "../../store/products/products.actions";

export default function Shop() {
  const { products, filtered } = useSelector((state) => state.productsSlice); // []
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://avet-clothes-shop-f8267-default-rtdb.firebaseio.com/clothes.json"
    )
      .then((data) => data.json())
      .then((products) =>
        dispatch({
          type: PRODUCTS_ACTION_TYPES.SET_PRODUCTS,
          payload: products,
        })
      );
  }, []);

  return (
    <div className="products-container">
      {filtered.length === 0
        ? products.length !== 0 &&
          Object.keys(products).map((product) => {
            return (
              <div key={Math.random()} className="product-type">
                <h1>{product}</h1>
                <div className="product-type-content">
                  {products[product].map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })
        
        : filtered.map((item) => {
            return (
              <div key={Math.random()} className="filtered-type-content">
                {item.map((product) => (
                  <ProductCard key={product.id} item={product} />
                ))}
              </div>
            );
          })}
    </div>
  );
}
