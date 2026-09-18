// Renders selectable size chips. For accessories the only size is "OS",
// which we present as a single non-critical chip.
export default function SizeSelector({ sizes, selected, onSelect, error }) {
  return (
    <div className={`size-selector ${error ? "has-error" : ""}`}>
      {sizes.map((s) => (
        <button
          key={s}
          type="button"
          className={`size-selector__chip ${
            selected === s ? "is-selected" : ""
          }`}
          onClick={() => onSelect(s)}
          aria-pressed={selected === s}
        >
          {s === "OS" ? "One size" : s}
        </button>
      ))}
    </div>
  );
}
