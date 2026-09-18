import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import wishlistReducer from "./wishlistSlice.js";
import filtersReducer from "./filtersSlice.js";
import authReducer from "./authSlice.js";
import uiReducer from "./uiSlice.js";
import { saveState } from "./storage.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    filters: filtersReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

// Persist cart + wishlist to localStorage on change (throttled by shallow ref
// checks so we only write when the relevant slice actually changed).
let lastCart;
let lastWishlist;
store.subscribe(() => {
  const state = store.getState();
  if (state.cart.items !== lastCart) {
    lastCart = state.cart.items;
    saveState("cart", state.cart.items);
  }
  if (state.wishlist.ids !== lastWishlist) {
    lastWishlist = state.wishlist.ids;
    saveState("wishlist", state.wishlist.ids);
  }
});
