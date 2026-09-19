import Icon from '@/components/common/Icon.jsx'
import {
	getCompleteTheLook,
	getProductById,
	getRelated
} from '@/data/products.js'
import { useFocusTrap } from '@/hooks/useFocusTrap.js'
import { useModalDismiss } from '@/hooks/useModalDismiss.js'
import {
	selectCartCount,
	selectCartItems,
	selectCartSubtotal
} from '@/store/cartSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { closeCart, openQuickView, selectCartOpen } from '@/store/uiSlice.js'
import { formatPrice } from '@/utils/formatPrice.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './CartDrawer.scss'
import CartLine from './CartLine.jsx'

// Suggest a few items to pair with what's already in the cart. Prefers curated
// "complete the look" matches, falls back to same-category picks, and never
// suggests something already in the bag.
function getSuggestions(items, limit = 3) {
	const inCart = new Set(items.map(i => i.id))
	const seen = new Set(inCart)
	const suggestions = []

	const consider = product => {
		if (!product || seen.has(product.id) || suggestions.length >= limit) return
		seen.add(product.id)
		suggestions.push(product)
	}

	const cartProducts = items.map(i => getProductById(i.id)).filter(Boolean)
	// Curated pairings first.
	cartProducts.forEach(p => getCompleteTheLook(p).forEach(consider))
	// Then related products to fill any remaining slots.
	cartProducts.forEach(p => getRelated(p).forEach(consider))

	return suggestions.slice(0, limit)
}

const FREE_SHIP_THRESHOLD = 150

export default function CartDrawer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const open = useAppSelector(selectCartOpen)
	const items = useAppSelector(selectCartItems)
	const subtotal = useAppSelector(selectCartSubtotal)
	const count = useAppSelector(selectCartCount)

	const panelRef = useRef(null)
	useFocusTrap(panelRef, open)
	useModalDismiss(open, () => dispatch(closeCart()))

	const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
	const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)
	const suggestions = getSuggestions(items)

	const goCheckout = () => {
		dispatch(closeCart())
		navigate('/checkout')
	}

	// Close the cart and open quick-view so the shopper picks size/color before
	// adding — avoids stacked overlays and silently adding an unchosen variant.
	// QuickView reopens the cart after a successful add.
	const onSuggest = id => {
		dispatch(closeCart())
		dispatch(openQuickView(id))
	}

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						className="cart-scrim"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => dispatch(closeCart())}
					/>
					<motion.aside
						className="cart-drawer"
						ref={panelRef}
						role="dialog"
						aria-modal="true"
						aria-label="Shopping bag"
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'tween', duration: 0.32 }}
					>
						<header className="cart-drawer__head">
							<h2>
								Your bag <span>({count})</span>
							</h2>
							<button
								onClick={() => dispatch(closeCart())}
								aria-label="Close bag"
							>
								<Icon name="close" />
							</button>
						</header>

						{items.length > 0 ? (
							<>
								<div className="cart-drawer__ship">
									{remaining > 0 ? (
										<p>
											You're <strong>{formatPrice(remaining)}</strong> away from
											free shipping
										</p>
									) : (
										<p className="cart-drawer__ship-done">
											<Icon
												name="check"
												size={16}
											/>{' '}
											You've unlocked free shipping
										</p>
									)}
									<div className="cart-drawer__bar">
										<span style={{ width: `${progress}%` }} />
									</div>
								</div>

								<div className="cart-drawer__items">
									{items.map(item => (
										<CartLine
											key={item.key}
											item={item}
										/>
									))}
								</div>

								{suggestions.length > 0 && (
									<div className="cart-drawer__upsell">
										<h3 className="cart-drawer__upsell-title">
											Complete the look
										</h3>
										<div className="cart-drawer__upsell-list">
											{suggestions.map(p => (
												<div
													key={p.id}
													className="upsell-item"
												>
													<img
														src={p.imageUrlSmall}
														alt={p.name}
														loading="lazy"
													/>
													<div className="upsell-item__info">
														<span className="upsell-item__name">{p.name}</span>
														<span className="upsell-item__price">
															{formatPrice(p.price)}
														</span>
													</div>
													<button
														className="upsell-item__add"
														onClick={() => onSuggest(p.id)}
														aria-label={`Add ${p.name}`}
													>
														<Icon
															name="plus"
															size={16}
														/>
													</button>
												</div>
											))}
										</div>
									</div>
								)}

								<footer className="cart-drawer__foot">
									<div className="cart-drawer__subtotal">
										<span>Subtotal</span>
										<strong>{formatPrice(subtotal)}</strong>
									</div>
									<p className="cart-drawer__note">
										Shipping & taxes calculated at checkout
									</p>
									<button
										className="btn btn--block"
										onClick={goCheckout}
									>
										Checkout
									</button>
									<button
										className="btn btn--ghost btn--block"
										onClick={() => dispatch(closeCart())}
									>
										Continue shopping
									</button>
								</footer>
							</>
						) : (
							<div className="cart-drawer__empty">
								<Icon
									name="bag"
									size={44}
								/>
								<h3>Your bag is empty</h3>
								<p>Discover something you'll love.</p>
								<button
									className="btn"
									onClick={() => {
										dispatch(closeCart())
										navigate('/shop')
									}}
								>
									Start shopping
								</button>
							</div>
						)}
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	)
}
