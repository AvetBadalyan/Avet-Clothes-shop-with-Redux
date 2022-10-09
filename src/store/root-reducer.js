import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { productsReducer } from "./products/products.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./Cart/cart.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
