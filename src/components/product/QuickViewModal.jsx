import ColorSwatches from '@/components/common/ColorSwatches.jsx'
import Icon from '@/components/common/Icon.jsx'
import Price from '@/components/common/Price.jsx'
import StarRating from '@/components/common/StarRating.jsx'
import ProductBadges from '@/components/product/ProductBadges.jsx'
import { getProductById } from '@/data/products.js'
import { useFocusTrap } from '@/hooks/useFocusTrap.js'
import { useModalDismiss } from '@/hooks/useModalDismiss.js'
import { addToCart } from '@/store/cartSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import {
  addToast,
  closeQuickView,
  openCart,
  selectQuickViewId
} from '@/store/uiSlice.js'
import { toggleWishlist } from '@/store/wishlistSlice.js'
import { isOneSize } from '@/utils/productHelpers.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './QuickViewModal.scss'
import SizeSelector from './SizeSelector.jsx'

export default function QuickViewModal() {
  const dispatch = useAppDispatch()
  const id = useAppSelector(selectQuickViewId)
  const product = id ? getProductById(id) : null
  const wished = useAppSelector((state) =>
    product ? state.wishlist.ids.includes(product.id) : false
  )

  const panelRef = useRef(null)
  useFocusTrap(panelRef, Boolean(product))

  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [error, setError] = useState(false)

  // Reset selections whenever a new product is opened.
  useEffect(() => {
    if (product) {
      setColor(product.colors[0]?.name ?? null)
      setSize(product.sizes.length === 1 ? product.sizes[0] : null)
      setError(false)
    }
  }, [product])

  useModalDismiss(Boolean(id), () => dispatch(closeQuickView()))

  const handleAdd = () => {
    if (!size) {
      setError(true)
      return
    }
    dispatch(addToCart({ product, size, color }))
    dispatch(addToast(`${product.name} added to bag`))
    dispatch(closeQuickView())
    dispatch(openCart())
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="quickview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(closeQuickView())}
        >
          <motion.div
            className="quickview__panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="quickview__close"
              onClick={() => dispatch(closeQuickView())}
              aria-label="Close quick view"
            >
              <Icon name="close" />
            </button>

            <div className="quickview__media">
              <img
                src={product.imageUrl}
                alt={product.name}
              />
              <ProductBadges
                product={product}
                className="quickview__badges"
              />
            </div>

            <div className="quickview__info">
              <span className="overline">{product.brand}</span>
              <h2 className="quickview__name">{product.name}</h2>
              <StarRating
                value={product.rating}
                reviews={product.reviews}
              />
              <Price
                value={product.price}
                was={product.priceWas}
                className="quickview__price"
              />
              <p className="quickview__desc">{product.description}</p>

              <div className="quickview__row">
                <span className="quickview__label">
                  Color: <strong>{color}</strong>
                </span>
                <ColorSwatches
                  colors={product.colors}
                  selected={color}
                  onSelect={setColor}
                  size={24}
                />
              </div>

              {!isOneSize(product) && (
                <div className="quickview__row">
                  <span className="quickview__label">
                    Size{' '}
                    {error && (
                      <em className="quickview__err">· select a size</em>
                    )}
                  </span>
                  <SizeSelector
                    sizes={product.sizes}
                    selected={size}
                    onSelect={(s) => {
                      setSize(s)
                      setError(false)
                    }}
                    error={error}
                  />
                </div>
              )}

              <div className="quickview__actions">
                <button
                  className="btn btn--block"
                  onClick={handleAdd}
                >
                  <Icon
                    name="bag"
                    size={18}
                  />{' '}
                  Add to bag
                </button>
                <button
                  className={`quickview__wish ${wished ? 'is-active' : ''}`}
                  onClick={() => dispatch(toggleWishlist(product.id))}
                  aria-label={
                    wished ? 'Remove from wishlist' : 'Add to wishlist'
                  }
                  aria-pressed={wished}
                >
                  <Icon
                    name="heart"
                    size={20}
                    filled={wished}
                  />
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="quickview__full"
                onClick={() => dispatch(closeQuickView())}
              >
                View full details{' '}
                <Icon
                  name="arrowRight"
                  size={16}
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
