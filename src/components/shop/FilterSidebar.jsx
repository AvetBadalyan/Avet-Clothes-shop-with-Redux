import { useAppDispatch, useAppSelector } from "@/store/hooks.js";
import {
  selectFilters,
  selectActiveFilterCount,
  toggleBrand,
  toggleSize,
  toggleColor,
  setPriceMax,
  setOnSaleOnly,
  setNewOnly,
  resetFilters,
} from "@/store/filtersSlice.js";
import { BRANDS, PRICE_BOUNDS, PRODUCTS } from "@/data/products.js";
import { formatPrice } from "@/components/common/Price.jsx";
import Icon from "@/components/common/Icon.jsx";
import "./FilterSidebar.scss";

// Derive the union of sizes and colors from the catalog.
const ALL_SIZES = [
  ...new Set(PRODUCTS.flatMap((p) => p.sizes)),
].filter((s) => s !== "OS");
const ALL_COLORS = (() => {
  const map = new Map();
  PRODUCTS.forEach((p) =>
    p.colors.forEach((c) => {
      if (!map.has(c.name)) map.set(c.name, c.hex);
    })
  );
  return [...map.entries()].map(([name, hex]) => ({ name, hex }));
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
  const f = useAppSelector(selectFilters);
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
            checked={f.newOnly}
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
            checked={f.onSaleOnly}
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
          value={f.priceMax}
          onChange={(e) => dispatch(setPriceMax(Number(e.target.value)))}
        />
        <div className="filters__range-labels">
          <span>{formatPrice(PRICE_BOUNDS.min)}</span>
          <span className="filters__range-value">
            Up to {formatPrice(f.priceMax)}
          </span>
        </div>
      </Section>

      <Section title="Brand">
        <div className="filter-list">
          {BRANDS.map((b) => (
            <label className="check" key={b}>
              <input
                type="checkbox"
                checked={f.brands.includes(b)}
                onChange={() => dispatch(toggleBrand(b))}
              />
              <span className="check__box">
                <Icon name="check" size={13} />
              </span>
              {b}
            </label>
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="size-grid">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              className={`size-chip ${f.sizes.includes(s) ? "is-active" : ""}`}
              onClick={() => dispatch(toggleSize(s))}
              aria-pressed={f.sizes.includes(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div className="color-grid">
          {ALL_COLORS.map((c) => (
            <button
              key={c.name}
              className={`color-chip ${
                f.colors.includes(c.name) ? "is-active" : ""
              }`}
              style={{ "--swatch": c.hex }}
              onClick={() => dispatch(toggleColor(c.name))}
              aria-pressed={f.colors.includes(c.name)}
              title={c.name}
              aria-label={c.name}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
