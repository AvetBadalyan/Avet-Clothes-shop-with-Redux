// Presentational color dots. `selected` (name) + `onSelect(name)` make it
// interactive; omit them for a read-only preview (e.g. on product cards).
export default function ColorSwatches({
  colors,
  selected,
  onSelect,
  size = 20,
  max,
}) {
  const shown = max ? colors.slice(0, max) : colors;
  const interactive = typeof onSelect === "function";

  return (
    <div className="swatches">
      {shown.map((c) => {
        const isSel = selected === c.name;
        const style = {
          "--swatch": c.hex,
          width: size,
          height: size,
        };
        return interactive ? (
          <button
            key={c.name}
            type="button"
            className={`swatches__dot ${isSel ? "is-selected" : ""}`}
            style={style}
            onClick={() => onSelect(c.name)}
            aria-label={c.name}
            aria-pressed={isSel}
            title={c.name}
          />
        ) : (
          <span
            key={c.name}
            className="swatches__dot"
            style={style}
            title={c.name}
          />
        );
      })}
      {max && colors.length > max && (
        <span className="swatches__more">+{colors.length - max}</span>
      )}
    </div>
  );
}
