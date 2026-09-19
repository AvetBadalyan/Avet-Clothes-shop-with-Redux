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
    toggleBrand(state, action) {
      const b = action.payload;
      state.brands = state.brands.includes(b)
        ? state.brands.filter((x) => x !== b)
        : [...state.brands, b];
    },
    toggleSize(state, action) {
      const s = action.payload;
      state.sizes = state.sizes.includes(s)
        ? state.sizes.filter((x) => x !== s)
        : [...state.sizes, s];
    },
    toggleColor(state, action) {
      const c = action.payload;
      state.colors = state.colors.includes(c)
        ? state.colors.filter((x) => x !== c)
        : [...state.colors, c];
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
  toggleBrand,
  toggleSize,
  toggleColor,
  setPriceMax,
  setOnSaleOnly,
  setNewOnly,
  setSort,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;

// --- Selectors -------------------------------------------------------------
export const selectFilters = (state) => state.filters;

const sortProducts = (list, sort) => {
  const arr = [...list];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "newest":
      return arr.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    case "popular":
    default:
      return arr.sort((a, b) => b.popularity - a.popularity);
  }
};

// Memoized product list derived from the active filters.
export const selectFilteredProducts = createSelector(
  [selectFilters],
  (f) => {
    const term = f.search.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      if (f.category !== "all" && p.category !== f.category) return false;
      if (term) {
        const haystack =
          `${p.name} ${p.brand} ${p.categoryTitle} ${p.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (f.brands.length && !f.brands.includes(p.brand)) return false;
      if (f.sizes.length && !f.sizes.some((s) => p.sizes.includes(s)))
        return false;
      if (
        f.colors.length &&
        !f.colors.some((c) => p.colors.some((pc) => pc.name === c))
      )
        return false;
      if (p.price > f.priceMax) return false;
      if (f.onSaleOnly && !p.onSale) return false;
      if (f.newOnly && !p.isNew) return false;
      return true;
    });
    return sortProducts(filtered, f.sort);
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
