import { PRICE_BOUNDS, PRODUCTS } from "@/data/products.js";
import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all", // 'all' | category id
  search: "",
  brands: [], // selected brand names
  sizes: [], // selected sizes
  colors: [], // selected color names
  priceMax: PRICE_BOUNDS.max, // upper bound of price slider
  onSaleOnly: false,
  newOnly: false,
  sort: "popular",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    // Toggle a value in one of the array filters (brands | sizes | colors).
    toggleArrayFilter(state, action) {
      const { field, value } = action.payload;
      const current = state[field];
      state[field] = current.includes(value)
        ? current.filter((x) => x !== value)
        : [...current, value];
    },
    setPriceMax(state, action) {
      state.priceMax = action.payload;
    },
    setOnSaleOnly(state, action) {
      state.onSaleOnly = action.payload;
    },
    setNewOnly(state, action) {
      state.newOnly = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    resetFilters(state) {
      return { ...initialState, category: state.category, sort: state.sort };
    },
  },
});

export const {
  setCategory,
  setSearch,
  toggleArrayFilter,
  setPriceMax,
  setOnSaleOnly,
  setNewOnly,
  setSort,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

// --- Selectors -------------------------------------------------------------
export const selectFilters = (state) => state.filters;

const sortProducts = (products, sort) => {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popular":
    default:
      return sorted.sort((a, b) => b.popularity - a.popularity);
  }
};

// Memoized product list derived from the active filters.
export const selectFilteredProducts = createSelector(
  [selectFilters],
  (filters) => {
    const searchTerm = filters.search.trim().toLowerCase();
    const filtered = PRODUCTS.filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category)
        return false;
      if (searchTerm) {
        const haystack =
          `${product.name} ${product.brand} ${product.categoryTitle} ${product.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(searchTerm)) return false;
      }
      if (filters.brands.length && !filters.brands.includes(product.brand))
        return false;
      if (
        filters.sizes.length &&
        !filters.sizes.some((size) => product.sizes.includes(size))
      )
        return false;
      if (
        filters.colors.length &&
        !filters.colors.some((color) =>
          product.colors.some((productColor) => productColor.name === color)
        )
      )
        return false;
      if (product.price > filters.priceMax) return false;
      if (filters.onSaleOnly && !product.onSale) return false;
      if (filters.newOnly && !product.isNew) return false;
      return true;
    });
    return sortProducts(filtered, filters.sort);
  }
);

// How many filters are active (for the "clear" affordance / badge).
export const selectActiveFilterCount = createSelector([selectFilters], (filters) => {
  let count = 0;
  count += filters.brands.length;
  count += filters.sizes.length;
  count += filters.colors.length;
  if (filters.onSaleOnly) count += 1;
  if (filters.newOnly) count += 1;
  if (filters.priceMax < PRICE_BOUNDS.max) count += 1;
  return count;
});
