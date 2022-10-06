import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { productsReducer } from "./products/products.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  productsSlice: productsReducer,
});
