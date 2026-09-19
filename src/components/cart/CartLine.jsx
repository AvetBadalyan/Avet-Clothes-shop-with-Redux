import { motion } from 'framer-motion'
import Icon from '@/components/common/Icon.jsx'
import { formatPrice } from '@/utils/formatPrice.js'
import { formatSize } from '@/utils/productHelpers.js'
import { useAppDispatch } from '@/store/hooks.js'
import { incrementLine, decrementLine, removeLine } from '@/store/cartSlice.js'

export default function CartLine({ item }) {
  const dispatch = useAppDispatch()

  return (
    <motion.div
      className="cart-line"
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <img
        className="cart-line__img"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="cart-line__body">
        <div className="cart-line__top">
          <div>
            <p className="cart-line__name">{item.name}</p>
            <p className="cart-line__variant">
              {item.color} · {formatSize(item.size)}
            </p>
          </div>
          <button
            className="cart-line__remove"
            onClick={() => dispatch(removeLine(item.key))}
            aria-label={`Remove ${item.name}`}
          >
            <Icon
              name="trash"
              size={16}
            />
          </button>
        </div>
        <div className="cart-line__bottom">
          <div className="cart-line__qty">
            <button
              onClick={() => dispatch(decrementLine(item.key))}
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <Icon
                name="minus"
                size={14}
              />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => dispatch(incrementLine(item.key))}
              aria-label="Increase quantity"
            >
              <Icon
                name="plus"
                size={14}
              />
            </button>
          </div>
          <span className="cart-line__price">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
