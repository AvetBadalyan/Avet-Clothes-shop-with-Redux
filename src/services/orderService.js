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
const bucketFor = email => (email ? email.toLowerCase() : 'guest')

const readAll = () => loadState(ORDERS_KEY, {})

export const orderService = {
	/** All orders for a given email (newest first). */
	list(email) {
		const all = readAll()
		return all[bucketFor(email)] ?? []
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
		saveState(ORDERS_KEY, all)
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
	date: new Date().toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}),
	status: 'processing',
	items: items.map(item => ({
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
