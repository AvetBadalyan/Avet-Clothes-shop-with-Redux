import Icon from '@/components/common/Icon.jsx'
import { formatPrice } from '@/components/common/Price.jsx'
import { selectUser } from '@/store/authSlice.js'
import {
	clearCart,
	selectCartItems,
	selectCartSubtotal
} from '@/store/cartSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { loadState, saveState } from '@/store/storage.js'
import { addToast } from '@/store/uiSlice.js'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Checkout.scss'

const SHIP_THRESHOLD = 150
const SHIP_COST = 12

const initialForm = {
	fullName: '',
	email: '',
	address: '',
	city: '',
	postalCode: '',
	country: ''
}

export default function Checkout() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const items = useAppSelector(selectCartItems)
	const subtotal = useAppSelector(selectCartSubtotal)
	const user = useAppSelector(selectUser)

	const [form, setForm] = useState(() => ({
		...initialForm,
		fullName: user?.name ?? '',
		email: user?.email ?? ''
	}))
	const [errors, setErrors] = useState({})
	const [placed, setPlaced] = useState(false)
	const [orderData, setOrderData] = useState(null)

	const shipping = subtotal >= SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIP_COST
	const total = subtotal + shipping

	const update = key => e => {
		setForm(f => ({ ...f, [key]: e.target.value }))
		setErrors(prev => ({ ...prev, [key]: undefined }))
	}

	const validate = () => {
		const next = {}
		if (!form.fullName.trim()) next.fullName = 'Required'
		if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
		if (!form.address.trim()) next.address = 'Required'
		if (!form.city.trim()) next.city = 'Required'
		if (!/^[A-Za-z0-9 -]{3,10}$/.test(form.postalCode))
			next.postalCode = 'Enter a valid postal code'
		if (!form.country.trim()) next.country = 'Required'
		setErrors(next)
		return Object.keys(next).length === 0
	}

	const placeOrder = e => {
		e.preventDefault()
		if (!validate()) {
			dispatch(addToast('Please check the highlighted fields', 'error'))
			return
		}

		// Generate order data
		const orderNo = `LX-${Math.floor(100000 + Math.random() * 900000)}`
		const newOrder = {
			id: orderNo,
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
			shippingAddress: {
				fullName: form.fullName,
				email: form.email,
				address: form.address,
				city: form.city,
				postalCode: form.postalCode,
				country: form.country
			}
		}

		// Save order to localStorage
		const existingOrders = loadState('orders', [])
		saveState('orders', [newOrder, ...existingOrders])

		setPlaced(true)
		setOrderData(newOrder)
		dispatch(clearCart())
		dispatch(addToast('Order placed successfully'))
		window.scrollTo({ top: 0 })
	}

	// --- Confirmation --------------------------------------------------------
	if (placed && orderData) {
		return (
			<div className="checkout-confirm container section">
				<motion.div
					className="checkout-confirm__card"
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
				>
					<span className="checkout-confirm__tick">
						<Icon
							name="check"
							size={34}
						/>
					</span>
					<p className="overline">Thank you</p>
					<h1>Your order is confirmed</h1>
					<p className="checkout-confirm__sub">
						A confirmation has been sent to{' '}
						<strong>{orderData.shippingAddress.email}</strong>. Your order
						number is <strong>{orderData.id}</strong>.
					</p>
					<div className="checkout-confirm__actions">
						<button
							className="btn"
							onClick={() => navigate('/account')}
						>
							View order history
						</button>
						<button
							className="btn btn--outline"
							onClick={() => navigate('/shop')}
						>
							Continue shopping
						</button>
					</div>
				</motion.div>
			</div>
		)
	}

	// --- Empty cart ----------------------------------------------------------
	if (items.length === 0) {
		return (
			<div className="checkout-empty container section">
				<Icon
					name="bag"
					size={48}
				/>
				<h1>Your bag is empty</h1>
				<p>Add some pieces before heading to checkout.</p>
				<Link
					to="/shop"
					className="btn"
				>
					Start shopping
				</Link>
			</div>
		)
	}

	// --- Checkout form -------------------------------------------------------
	return (
		<div className="checkout container">
			<header className="checkout__head">
				<p className="overline">Secure checkout</p>
				<h1>Checkout</h1>
			</header>

			<div className="checkout__grid">
				<form
					className="checkout__form"
					onSubmit={placeOrder}
					noValidate
				>
					{!user && (
						<div className="checkout__signin-note">
							<Icon
								name="user"
								size={18}
							/>
							<span>
								Have an account? <Link to="/account">Sign in</Link> for a faster
								checkout.
							</span>
						</div>
					)}

					<fieldset className="checkout__fieldset">
						<legend>Contact</legend>
						<label className="field">
							<span>Full name</span>
							<input
								type="text"
								value={form.fullName}
								onChange={update('fullName')}
								aria-invalid={!!errors.fullName}
								placeholder="Jane Doe"
							/>
							{errors.fullName && (
								<em className="field__err">{errors.fullName}</em>
							)}
						</label>
						<label className="field">
							<span>Email</span>
							<input
								type="email"
								value={form.email}
								onChange={update('email')}
								aria-invalid={!!errors.email}
								placeholder="you@example.com"
							/>
							{errors.email && <em className="field__err">{errors.email}</em>}
						</label>
					</fieldset>

					<fieldset className="checkout__fieldset">
						<legend>Shipping address</legend>
						<label className="field">
							<span>Address</span>
							<input
								type="text"
								value={form.address}
								onChange={update('address')}
								aria-invalid={!!errors.address}
								placeholder="123 Market Street"
							/>
							{errors.address && (
								<em className="field__err">{errors.address}</em>
							)}
						</label>
						<div className="checkout__row">
							<label className="field">
								<span>City</span>
								<input
									type="text"
									value={form.city}
									onChange={update('city')}
									aria-invalid={!!errors.city}
									placeholder="Yerevan"
								/>
								{errors.city && <em className="field__err">{errors.city}</em>}
							</label>
							<label className="field">
								<span>Postal code</span>
								<input
									type="text"
									value={form.postalCode}
									onChange={update('postalCode')}
									aria-invalid={!!errors.postalCode}
									placeholder="0010"
								/>
								{errors.postalCode && (
									<em className="field__err">{errors.postalCode}</em>
								)}
							</label>
						</div>
						<label className="field">
							<span>Country</span>
							<input
								type="text"
								value={form.country}
								onChange={update('country')}
								aria-invalid={!!errors.country}
								placeholder="Armenia"
							/>
							{errors.country && (
								<em className="field__err">{errors.country}</em>
							)}
						</label>
					</fieldset>

					<button
						className="btn btn--block checkout__submit"
						type="submit"
					>
						<Icon
							name="shield"
							size={18}
						/>{' '}
						Place order · {formatPrice(total)}
					</button>
					<p className="checkout__disclaimer">
						This is a demo store. No payment is taken and no order is shipped.
					</p>
				</form>

				{/* Order summary */}
				<aside className="checkout__summary">
					<h2>Order summary</h2>
					<ul className="checkout__lines">
						{items.map(item => (
							<li
								key={item.key}
								className="checkout__line"
							>
								<div className="checkout__line-img">
									<img
										src={item.imageUrl}
										alt={item.name}
									/>
									<span className="checkout__line-qty">{item.quantity}</span>
								</div>
								<div className="checkout__line-info">
									<p>{item.name}</p>
									<span>
										{item.color} · {item.size === 'OS' ? 'One size' : item.size}
									</span>
								</div>
								<span className="checkout__line-price">
									{formatPrice(item.price * item.quantity)}
								</span>
							</li>
						))}
					</ul>

					<dl className="checkout__totals">
						<div>
							<dt>Subtotal</dt>
							<dd>{formatPrice(subtotal)}</dd>
						</div>
						<div>
							<dt>Shipping</dt>
							<dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
						</div>
						<div className="checkout__grand">
							<dt>Total</dt>
							<dd>{formatPrice(total)}</dd>
						</div>
					</dl>
				</aside>
			</div>
		</div>
	)
}
