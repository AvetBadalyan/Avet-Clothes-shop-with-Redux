import React, { useEffect } from "react";
import ProductCard from "../../Components/product-card/ProductCard";
import "./Shop.styles.scss";
import { useDispatch, useSelector } from "react-redux";

export default function Shop() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.productSlice?.value); // []

  useEffect(() => {
    fetch(
      "https://avet-clothes-shop-f8267-default-rtdb.firebaseio.com/clothes.json"
    )
      .then((data) => data.json())
      .then((shop) => console.log(shop));
  }, []);

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
