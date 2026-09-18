import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard.jsx";
import FilterSidebar from "@/components/shop/FilterSidebar.jsx";
import Icon from "@/components/common/Icon.jsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks.js";
import {
  selectFilteredProducts,
  selectFilters,
  selectActiveFilterCount,
  setCategory,
  setSort,
  setSearch,
  resetFilters,
} from "@/store/filtersSlice.js";
import {
  toggleFilters,
  closeFilters,
  selectFiltersOpen,
} from "@/store/uiSlice.js";
import { CATEGORIES, SORT_OPTIONS } from "@/data/products.js";
import "./Shop.scss";

export default function Shop() {
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const filters = useAppSelector(selectFilters);
  const activeCount = useAppSelector(selectActiveFilterCount);
  const filtersOpen = useAppSelector(selectFiltersOpen);

  // Keep the filter category in sync with the URL param.
  useEffect(() => {
    dispatch(setCategory(categoryId ?? "all"));
  }, [categoryId, dispatch]);

  // Lock scroll while the mobile filter drawer is open.
  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const category = CATEGORIES.find((c) => c.id === filters.category);
  const heading = category ? category.title : "All Products";
  const tagline = category
    ? category.tagline
    : "The full LUXE collection, curated for the season.";

  return (
    <div className="shop">
      {/* Page header */}
      <header className="shop__hero container">
        <nav className="shop__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <Icon name="chevronRight" size={14} />
          <span>{heading}</span>
        </nav>
        <h1 className="shop__title">{heading}</h1>
        <p className="shop__tagline">{tagline}</p>
      </header>

      <div className="shop__body container">
        {/* Desktop sidebar */}
        <aside className="shop__sidebar">
          <FilterSidebar />
        </aside>

        <div className="shop__content">
          {/* Toolbar */}
          <div className="shop__toolbar">
            <button
              className="shop__filter-btn"
              onClick={() => dispatch(toggleFilters())}
            >
              <Icon name="filter" size={18} />
              Filters
              {activeCount > 0 && <em>{activeCount}</em>}
            </button>

            <span className="shop__count">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>

            <label className="shop__sort">
              <span>Sort</span>
              <select
                value={filters.sort}
                onChange={(e) => dispatch(setSort(e.target.value))}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} />
            </label>
          </div>

          {/* Active search chip */}
          {filters.search && (
            <div className="shop__searchnote">
              Showing results for <strong>“{filters.search}”</strong>
              <button onClick={() => dispatch(setSearch(""))}>
                <Icon name="close" size={14} /> clear
              </button>
            </div>
          )}

          {/* Grid or empty state */}
          {products.length > 0 ? (
            <motion.div layout className="product-grid">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <div className="shop__empty">
              <Icon name="search" size={40} />
              <h3>No products match your filters</h3>
              <p>Try adjusting or clearing your filters to see more.</p>
              <button
                className="btn btn--outline"
                onClick={() => dispatch(resetFilters())}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              className="shop__scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(closeFilters())}
            />
            <motion.aside
              className="shop__drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="shop__drawer-head">
                <h3>Filters</h3>
                <button onClick={() => dispatch(closeFilters())} aria-label="Close">
                  <Icon name="close" />
                </button>
              </div>
              <div className="shop__drawer-body">
                <FilterSidebar />
              </div>
              <div className="shop__drawer-foot">
                <button
                  className="btn btn--block"
                  onClick={() => dispatch(closeFilters())}
                >
                  Show {products.length} results
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
