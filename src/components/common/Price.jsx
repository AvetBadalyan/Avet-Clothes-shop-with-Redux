import { formatPrice } from '@/utils/formatPrice.js'

export default function Price({ value, was, className = '' }) {
  return (
    <span className={`price ${className}`}>
      <span className="price__now">{formatPrice(value)}</span>
      {was && was > value && (
        <span className="price__was">{formatPrice(was)}</span>
      )}
    </span>
  )
}
