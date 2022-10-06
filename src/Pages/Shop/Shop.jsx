import React, { useEffect } from "react";
import ProductCard from "../../Components/product-card/ProductCard";
import "./Shop.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_ACTION_TYPES } from "../../store/products/products.reducer";

export default function Shop() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsSlice?.products); // []

  useEffect(() => {
    fetch(
      "https://avet-clothes-shop-f8267-default-rtdb.firebaseio.com/clothes.json"
    )
      .then((data) => data.json())
      .then((shop) =>
        dispatch({ type: PRODUCTS_ACTION_TYPES.SET_PRODUCTS, payload: shop })
      );
  }, [dispatch]);

  useEffect(() => {
    console.log("products: ",products)
   }, [products, products?.length])

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
