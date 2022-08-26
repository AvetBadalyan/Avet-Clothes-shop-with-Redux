import React from "react";
import SHOP_DATA from "./../../shop-data.json";

export default function Shop() {
  return <div>
    {SHOP_DATA.map(product => <div key={product.id}>
      <h1>{product.name}</h1>
    </div> )}
  </div>;
}
