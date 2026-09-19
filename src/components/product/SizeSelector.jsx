import { formatSize } from '@/utils/productHelpers.js'

// Renders selectable size chips. For accessories the only size is "OS",
// which we present as a single non-critical chip.
export default function SizeSelector({ sizes, selected, onSelect, error }) {
  return (
    <div
      className={`size-selector ${error ? 'has-error' : ''}`}
      role="radiogroup"
      aria-label="Select size"
    >
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          className={`size-selector__chip ${
            selected === size ? 'is-selected' : ''
          }`}
          onClick={() => onSelect(size)}
          aria-pressed={selected === size}
          aria-label={`Size ${formatSize(size)}`}
        >
          {formatSize(size)}
        </button>
      ))}
    </div>
  )
}
