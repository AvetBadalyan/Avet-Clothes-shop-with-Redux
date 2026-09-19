/**
 * "New" and sale badges shown on a product's media. Renders nothing when the
 * product is neither new nor on sale.
 */
export default function ProductBadges({
  product,
  className = 'product-card__badges'
}) {
  if (!product.isNew && !product.onSale) return null
  return (
    <div className={className}>
      {product.isNew && <span className="badge badge--new">New</span>}
      {product.onSale && (
        <span className="badge badge--sale">-{product.discountPct}%</span>
      )}
    </div>
  )
}
