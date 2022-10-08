import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { productsReducer } from "./products/products.reducer";
import { categoriesReducer } from "./categories/category.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  categories: categoriesReducer
});
