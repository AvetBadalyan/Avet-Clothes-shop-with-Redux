import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { productsReducer } from "./products/products.reducer";
import { cartReducer } from "./Cart/cart.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { singleCategoryReducer } from "./Category/category.reducer";

export const rootReducer = combineReducers({
  userSlice: userReducer,
  productsSlice: productsReducer,
  cartSlice: cartReducer,
  categoriesSlice: categoriesReducer,
  singleCategorySlice: singleCategoryReducer,
});
