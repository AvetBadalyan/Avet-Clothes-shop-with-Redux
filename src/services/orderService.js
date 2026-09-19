// ============================================================
//  Order service abstraction.
//
//  Orders are keyed by the CHECKOUT email (from shippingAddress), not
//  the signed-in user's session. This means:
//  1. Guest orders are stored under the email they entered at checkout
//  2. When a user signs in with that email, they see all their orders
//     — both guest and signed-in — automatically reconciled
//
//  This mirrors how Shopify, Amazon, etc. handle guest checkout.
// ============================================================
import { loadState, saveState } from '@/store/storage.js'

const ORDERS_KEY = 'orders'
const bucketFor = (email) => (email ? email.toLowerCase() : 'guest')

const readAll = () => loadState(ORDERS_KEY, {})

// Fulfilment stages a demo order moves through as it ages. Derived from the
// order's timestamp at read time (rather than stored) so past orders always
// show a believable status without a backend job flipping it.
const DAY_MS = 24 * 60 * 60 * 1000
const deriveStatus = (order) => {
  const placed = order.createdAt
    ? Date.parse(order.createdAt)
    : Date.parse(order.date)
  if (Number.isNaN(placed)) return order.status ?? 'processing'
  const ageDays = (Date.now() - placed) / DAY_MS
  if (ageDays >= 5) return 'delivered'
  if (ageDays >= 2) return 'shipped'
  return 'processing'
}

export const orderService = {
  /** All orders for a given email (newest first), with a freshly derived status. */
  list(email) {
    const all = readAll()
    const orders = all[bucketFor(email)] ?? []
    return orders.map((order) => ({ ...order, status: deriveStatus(order) }))
  },

  /**
   * Add an order, keyed by the CHECKOUT email (shippingAddress.email).
   * This ensures guest orders reconcile when the user later signs up
   * with the same email.
   *
   * @param {Object} order - The order object (must contain shippingAddress.email)
   */
  add(order) {
    const checkoutEmail = order.shippingAddress?.email
    const all = readAll()
    const bucket = bucketFor(checkoutEmail)
    all[bucket] = [order, ...(all[bucket] ?? [])]
    const saved = saveState(ORDERS_KEY, all)
    if (!saved) {
      throw new Error('We could not save your order. Please try again.')
    }
    return order
  }
}

/** Build the order number + record from cart data. */
export const createOrder = ({
  items,
  subtotal,
  shipping,
  total,
  shippingAddress
}) => ({
  id: `LX-${Math.floor(100000 + Math.random() * 900000)}`,
  createdAt: new Date().toISOString(),
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }),
  status: 'processing',
  items: items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    imageUrl: item.imageUrl
  })),
  subtotal,
  shipping,
  total,
  shippingAddress
})
