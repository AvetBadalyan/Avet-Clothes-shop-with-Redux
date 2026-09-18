import Icon from '@/components/common/Icon.jsx'
import { getProductById, img } from '@/data/products.js'
import { usePageTitle } from '@/hooks/usePageTitle.js'
import { orderService } from '@/services/orderService.js'
import {
	clearAuthError,
	selectAuthError,
	selectAuthStatus,
	selectUser,
	signIn,
	signOut,
	signUp
} from '@/store/authSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { addToast } from '@/store/uiSlice.js'
import { selectWishlistIds } from '@/store/wishlistSlice.js'
import { formatPrice } from '@/utils/formatPrice.js'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Auth.scss'

export default function Auth() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const user = useAppSelector(selectUser)
	const status = useAppSelector(selectAuthStatus)
	const error = useAppSelector(selectAuthError)
	const wishlistIds = useAppSelector(selectWishlistIds)

	// Check for pre-filled data from checkout redirect
	const prefillData = location.state || {}
	const {
		prefillEmail,
		prefillName,
		mode: initialMode,
		tab: initialTab
	} = prefillData

	const [mode, setMode] = useState(
		initialMode === 'signup' ? 'signup' : 'login'
	)
	const [form, setForm] = useState({
		name: prefillName || '',
		email: prefillEmail || '',
		password: ''
	})
	const [showPassword, setShowPassword] = useState(false)
	const [formErrors, setFormErrors] = useState({})
	const [activeTab, setActiveTab] = useState(initialTab ?? 'overview') // 'overview' | 'orders' | 'wishlist'

	// Set page title based on auth state - must be after state is defined
	usePageTitle(
		user ? 'My Account' : mode === 'login' ? 'Sign In' : 'Create Account'
	)

	// Order history for the signed-in user (empty when logged out).
	const orders = orderService.list(user?.email)

	useEffect(() => {
		dispatch(clearAuthError())
		setFormErrors({})
	}, [mode, dispatch])

	// Clear location state after consuming it (prevents stale prefill on refresh)
	useEffect(() => {
		if (prefillEmail || prefillName) {
			window.history.replaceState({}, document.title)
		}
	}, [prefillEmail, prefillName])

	const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

	// Users arriving from the post-checkout prompt carry prefill state; send
	// them to their account so they land on the now-populated order history,
	// not back on the stale confirmation screen. Everyone else goes back.
	const cameFromCheckout = Boolean(prefillEmail || prefillName)

	const submit = async e => {
		e.preventDefault()
		// Client-side validation for signup
		if (mode === 'signup') {
			const errs = {}
			if (!form.name.trim()) errs.name = 'Please enter your name'
			if (form.password.length < 6)
				errs.password = 'Password must be at least 6 characters'
			if (Object.keys(errs).length) {
				setFormErrors(errs)
				return
			}
		}
		setFormErrors({})
		const action = mode === 'login' ? signIn : signUp
		const result = await dispatch(action(form))
		if (action.fulfilled.match(result)) {
			dispatch(addToast(`Welcome${mode === 'signup' ? '' : ' back'}!`))
			if (cameFromCheckout) {
				navigate('/account', { replace: true })
			} else {
				navigate(-1)
			}
		}
	}

	// Logged-in view - Enhanced Account Dashboard
	if (user) {
		const wishlistProducts = wishlistIds.map(getProductById).filter(Boolean)

		return (
			<div className="account container">
				<header className="account__header">
					<div className="account__avatar">
						{user.name?.[0]?.toUpperCase() ?? 'U'}
					</div>
					<div className="account__info">
						<p className="overline">My account</p>
						<h1>{user.name}</h1>
						<p className="account__email">{user.email}</p>
					</div>
					<button
						className="btn btn--outline btn--sm"
						onClick={() => {
							dispatch(signOut())
							dispatch(addToast('Signed out', 'info'))
						}}
					>
						Sign out
					</button>
				</header>

				<div className="account__tabs">
					<button
						className={activeTab === 'overview' ? 'is-active' : ''}
						onClick={() => setActiveTab('overview')}
					>
						Overview
					</button>
					<button
						className={activeTab === 'orders' ? 'is-active' : ''}
						onClick={() => setActiveTab('orders')}
					>
						Order History
					</button>
					<button
						className={activeTab === 'wishlist' ? 'is-active' : ''}
						onClick={() => setActiveTab('wishlist')}
					>
						Wishlist ({wishlistIds.length})
					</button>
				</div>

				<div className="account__content">
					{activeTab === 'overview' && (
						<div className="account__overview">
							<div className="account__stats">
								<div className="account__stat">
									<Icon
										name="bag"
										size={24}
									/>
									<div>
										<strong>{orders.length}</strong>
										<span>Orders</span>
									</div>
								</div>
								<div className="account__stat">
									<Icon
										name="heart"
										size={24}
									/>
									<div>
										<strong>{wishlistIds.length}</strong>
										<span>Wishlist items</span>
									</div>
								</div>
							</div>

							<div className="account__section">
								<h3>Quick Actions</h3>
								<div className="account__actions">
									<button
										className="btn"
										onClick={() => navigate('/shop')}
									>
										Continue shopping
									</button>
									<button
										className="btn btn--outline"
										onClick={() => navigate('/wishlist')}
									>
										View wishlist
									</button>
								</div>
							</div>

							<div className="account__section">
								<h3>Account Details</h3>
								<div className="account__details">
									<div className="account__detail">
										<span>Name</span>
										<strong>{user.name}</strong>
									</div>
									<div className="account__detail">
										<span>Email</span>
										<strong>{user.email}</strong>
									</div>
									<div className="account__detail">
										<span>Member since</span>
										<strong>
											{user.createdAt
												? new Date(user.createdAt).toLocaleDateString('en-US', {
														month: 'long',
														year: 'numeric'
													})
												: '—'}
										</strong>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'orders' && (
						<div className="account__orders">
							{orders.length > 0 ? (
								orders.map(order => (
									<div
										key={order.id}
										className="order-card"
									>
										<div className="order-card__header">
											<div>
												<span className="order-card__id">{order.id}</span>
												<span className="order-card__date">{order.date}</span>
											</div>
											<span
												className={`order-card__status order-card__status--${order.status}`}
											>
												{order.status}
											</span>
										</div>
										<div className="order-card__items">
											{order.items.slice(0, 3).map((item, i) => (
												<img
													key={i}
													src={item.imageUrl}
													alt={item.name}
												/>
											))}
											{order.items.length > 3 && (
												<span className="order-card__more">
													+{order.items.length - 3}
												</span>
											)}
										</div>
										<div className="order-card__footer">
											<span>{order.items.length} items</span>
											<strong>{formatPrice(order.total)}</strong>
										</div>
									</div>
								))
							) : (
								<div className="account__empty">
									<Icon
										name="bag"
										size={48}
									/>
									<h3>No orders yet</h3>
									<p>When you place an order, it will appear here.</p>
									<button
										className="btn"
										onClick={() => navigate('/shop')}
									>
										Start shopping
									</button>
								</div>
							)}
						</div>
					)}

					{activeTab === 'wishlist' && (
						<div className="account__wishlist">
							{wishlistProducts.length > 0 ? (
								<div className="account__wishlist-grid">
									{wishlistProducts.slice(0, 4).map(p => (
										<Link
											key={p.id}
											to={`/product/${p.id}`}
											className="wishlist-card"
										>
											<img
												src={p.imageUrl}
												alt={p.name}
											/>
											<div className="wishlist-card__info">
												<span className="wishlist-card__brand">{p.brand}</span>
												<span className="wishlist-card__name">{p.name}</span>
												<span className="wishlist-card__price">
													{formatPrice(p.price)}
												</span>
											</div>
										</Link>
									))}
								</div>
							) : (
								<div className="account__empty">
									<Icon
										name="heart"
										size={48}
									/>
									<h3>Your wishlist is empty</h3>
									<p>Save items you love by tapping the heart icon.</p>
									<button
										className="btn"
										onClick={() => navigate('/shop')}
									>
										Explore products
									</button>
								</div>
							)}
							{wishlistProducts.length > 0 && (
								<button
									className="btn btn--outline"
									onClick={() => navigate('/wishlist')}
								>
									View all wishlist items
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		)
	}

	const loading = status === 'loading'

	return (
		<div className="auth">
			<div
				className="auth__aside"
				style={{
					backgroundImage: `url(${img('photo-1441984904996-e0b6ba687e04', 1000)})`
				}}
			>
				<div className="auth__aside-overlay" />
				<div className="auth__aside-content">
					<span className="auth__logo">MODERN</span>
					<p>
						Members enjoy early access, saved wishlists and faster checkout.
					</p>
					<ul className="auth__aside-perks">
						<li>✓ Saved shipping address — one-tap checkout</li>
						<li>✓ Full order history, guest orders included</li>
						<li>✓ Wishlist that persists across devices</li>
						<li>✓ Early access to new arrivals &amp; sales</li>
					</ul>
				</div>
			</div>

			<motion.div
				className="auth__panel"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="auth__box">
					<p className="overline">
						{mode === 'login' ? 'Welcome back' : 'Join us'}
					</p>
					<h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1>

					<div className="auth__tabs">
						<button
							className={mode === 'login' ? 'is-active' : ''}
							onClick={() => setMode('login')}
						>
							Sign in
						</button>
						<button
							className={mode === 'signup' ? 'is-active' : ''}
							onClick={() => setMode('signup')}
						>
							Register
						</button>
					</div>

					<form
						onSubmit={submit}
						className="auth__form"
					>
						{mode === 'signup' && (
							<label className="field">
								<span>Full name</span>
								<input
									type="text"
									value={form.name}
									onChange={update('name')}
									placeholder="Jane Doe"
									autoComplete="name"
									aria-invalid={!!formErrors.name}
								/>
								{formErrors.name && (
									<em className="field__err">{formErrors.name}</em>
								)}
							</label>
						)}
						<label className="field">
							<span>Email</span>
							<input
								type="email"
								required
								value={form.email}
								onChange={update('email')}
								placeholder="you@example.com"
								autoComplete="email"
							/>
						</label>
						<div className="field">
							<span>Password</span>
							<div className="field__password">
								<input
									type={showPassword ? 'text' : 'password'}
									required
									minLength={6}
									value={form.password}
									onChange={update('password')}
									placeholder="••••••••"
									autoComplete={
										mode === 'login' ? 'current-password' : 'new-password'
									}
									aria-invalid={!!formErrors.password}
								/>
								<button
									type="button"
									className="field__toggle"
									onClick={() => setShowPassword(!showPassword)}
									aria-label={showPassword ? 'Hide password' : 'Show password'}
								>
									<Icon
										name={showPassword ? 'eyeOff' : 'eye'}
										size={18}
									/>
								</button>
							</div>
							{formErrors.password && (
								<em className="field__err">{formErrors.password}</em>
							)}
						</div>

						{error && (
							<p className="auth__error">
								<Icon
									name="close"
									size={14}
								/>{' '}
								{error}
							</p>
						)}

						<button
							className="btn btn--block"
							disabled={loading}
						>
							{loading
								? 'Please wait…'
								: mode === 'login'
									? 'Sign in'
									: 'Create account'}
						</button>
					</form>

					<p className="auth__switch">
						{mode === 'login' ? (
							<>
								New here?{' '}
								<button onClick={() => setMode('signup')}>
									Create an account
								</button>
							</>
						) : (
							<>
								Already a member?{' '}
								<button onClick={() => setMode('login')}>Sign in</button>
							</>
						)}
					</p>

					<p className="auth__hint">
						Demo only — no real credentials are stored on a server.
					</p>
				</div>
			</motion.div>
		</div>
	)
}
