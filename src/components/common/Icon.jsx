// Lightweight inline SVG icon set (stroke-based, 24x24) — no icon library dep.
import * as paths from './icons/index.js'

export default function Icon({
  name,
  size = 22,
  filled = false,
  className,
  ...rest
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name] ?? null}
    </svg>
  )
}
