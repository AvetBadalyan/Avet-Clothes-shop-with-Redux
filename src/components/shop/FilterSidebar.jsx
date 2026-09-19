import Icon from "@/components/common/Icon.jsx"
import { BRANDS, PRICE_BOUNDS, PRODUCTS } from "@/data/products.js"
import {
  resetFilters,
  selectActiveFilterCount,
  selectFilters,
  setNewOnly,
  setOnSaleOnly,
  setPriceMax,
  toggleArrayFilter
} from "@/store/filtersSlice.js"
import { useAppDispatch, useAppSelector } from "@/store/hooks.js"
import { formatPrice } from "@/utils/formatPrice.js"
import "./FilterSidebar.scss"

// Derive the union of sizes and colors from the catalog.
const ALL_SIZES = [
  ...new Set(PRODUCTS.flatMap((product) => product.sizes)),
].filter((size) => size !== "OS");
const ALL_COLORS = (() => {
  const colorMap = new Map();
  PRODUCTS.forEach((product) =>
    product.colors.forEach((color) => {
      if (!colorMap.has(color.name)) colorMap.set(color.name, color.hex);
    })
  );
  return [...colorMap.entries()].map(([name, hex]) => ({ name, hex }));
})();

function Section({ title, children }) {
  return (
    <div className="filter-section">
      <h4 className="filter-section__title">{title}</h4>
      {children}
    </div>
  );
}

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const activeCount = useAppSelector(selectActiveFilterCount);

  return (
    <div className="filters">
      <div className="filters__head">
        <span>
          Filters
          {activeCount > 0 && <em className="filters__badge">{activeCount}</em>}
        </span>
        {activeCount > 0 && (
          <button
            className="filters__clear"
            onClick={() => dispatch(resetFilters())}
          >
            Clear all
          </button>
        )}
      </div>

      <Section title="Quick filters">
        <label className="check">
          <input
            type="checkbox"
            checked={filters.newOnly}
            onChange={(e) => dispatch(setNewOnly(e.target.checked))}
          />
          <span className="check__box">
            <Icon name="check" size={13} />
          </span>
          New arrivals
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={filters.onSaleOnly}
            onChange={(e) => dispatch(setOnSaleOnly(e.target.checked))}
          />
          <span className="check__box">
            <Icon name="check" size={13} />
          </span>
          On sale
        </label>
      </Section>

      <Section title="Price">
        <input
          className="range"
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          value={filters.priceMax}
          onChange={(e) => dispatch(setPriceMax(Number(e.target.value)))}
          aria-label="Maximum price"
          aria-valuetext={formatPrice(filters.priceMax)}
        />
        <div className="filters__range-labels">
          <span>{formatPrice(PRICE_BOUNDS.min)}</span>
          <span className="filters__range-value">
            Up to {formatPrice(filters.priceMax)}
          </span>
        </div>
      </Section>

      <Section title="Brand">
        <div className="filter-list">
          {BRANDS.map((brand) => (
            <label className="check" key={brand}>
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() =>
                  dispatch(toggleArrayFilter({ field: "brands", value: brand }))
                }
              />
              <span className="check__box">
                <Icon name="check" size={13} />
              </span>
              {brand}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="size-grid">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              className={`size-chip ${
                filters.sizes.includes(size) ? "is-active" : ""
              }`}
              onClick={() =>
                dispatch(toggleArrayFilter({ field: "sizes", value: size }))
              }
              aria-pressed={filters.sizes.includes(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="color-grid">
          {ALL_COLORS.map((color) => (
            <button
              key={color.name}
              className={`color-chip ${
                filters.colors.includes(color.name) ? "is-active" : ""
              }`}
              style={{ "--swatch": color.hex }}
              onClick={() =>
                dispatch(toggleArrayFilter({ field: "colors", value: color.name }))
              }
              aria-pressed={filters.colors.includes(color.name)}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
