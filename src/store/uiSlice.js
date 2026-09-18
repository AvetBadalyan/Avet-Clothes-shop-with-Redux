import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartOpen: false,
  filtersOpen: false, // mobile filter drawer
  quickViewId: null, // product id shown in quick-view modal
  toasts: [], // { id, message, type }
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCart(state) {
      state.cartOpen = true;
    },
    closeCart(state) {
      state.cartOpen = false;
    },
    toggleFilters(state) {
      state.filtersOpen = !state.filtersOpen;
    },
    closeFilters(state) {
      state.filtersOpen = false;
    },
    openQuickView(state, action) {
      state.quickViewId = action.payload;
    },
    closeQuickView(state) {
      state.quickViewId = null;
    },
    addToast: {
      reducer(state, action) {
        state.toasts.push(action.payload);
      },
      prepare(message, type = "success") {
        return { payload: { id: nanoid(), message, type } };
      },
    },
    dismissToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  openCart,
  closeCart,
  toggleFilters,
  closeFilters,
  openQuickView,
  closeQuickView,
  addToast,
  dismissToast,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectCartOpen = (state) => state.ui.cartOpen;
export const selectFiltersOpen = (state) => state.ui.filtersOpen;
export const selectQuickViewId = (state) => state.ui.quickViewId;
export const selectToasts = (state) => state.ui.toasts;
