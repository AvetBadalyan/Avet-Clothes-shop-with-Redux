import Icon from '@/components/common/Icon.jsx'
import { CATEGORIES } from '@/data/products.js'
import { selectIsAuthenticated, selectUser } from '@/store/authSlice.js'
import { selectCartCount } from '@/store/cartSlice.js'
import { setCategory, setSearch } from '@/store/filtersSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { openCart, selectCartOpen } from '@/store/uiSlice.js'
import { selectWishlistCount } from '@/store/wishlistSlice.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.scss'

export default function Navbar() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const cartCount = useAppSelector(selectCartCount)
	const wishCount = useAppSelector(selectWishlistCount)
	const isAuth = useAppSelector(selectIsAuthenticated)
	const user = useAppSelector(selectUser)
	const cartOpen = useAppSelector(selectCartOpen)

	const [scrolled, setScrolled] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const [term, setTerm] = useState('')

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12)
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	// Lock body scroll when the mobile menu is open.
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [menuOpen])

	const submitSearch = e => {
		e.preventDefault()
		dispatch(setCategory('all'))
		dispatch(setSearch(term))
		setSearchOpen(false)
		setMenuOpen(false)
		navigate('/shop')
	}

	const goCategory = id => {
		dispatch(setSearch(''))
		dispatch(setCategory(id))
		setMenuOpen(false)
	}

	return (
		<header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
			<div className="navbar__inner container">
				{/* Left side: burger (mobile) + logo */}
				<div className="navbar__left">
					<button
						className="navbar__icon-btn navbar__burger"
						aria-label="Open menu"
						onClick={() => setMenuOpen(true)}
					>
						<Icon name="menu" />
					</button>

					<Link
						to="/"
						className="navbar__logo"
						aria-label="LUXE home"
					>
						LUXE
					</Link>

					{/* Desktop navigation - next to logo */}
					<nav
						className="navbar__nav"
						aria-label="Primary"
					>
						<NavLink
							to="/shop"
							onClick={() => goCategory('all')}
						>
							All
						</NavLink>
						{CATEGORIES.map(c => (
							<NavLink
								key={c.id}
								to={`/shop/${c.id}`}
								onClick={() => goCategory(c.id)}
							>
								{c.title}
							</NavLink>
						))}
					</nav>
				</div>

				{/* Right side: action icons */}
				<div className="navbar__actions">
					<button
						className="navbar__icon-btn"
						aria-label="Search"
						onClick={() => setSearchOpen(s => !s)}
					>
						<Icon name="search" />
					</button>

					<Link
						to="/account"
						className="navbar__icon-btn navbar__account"
						aria-label={isAuth ? `Account: ${user?.name}` : 'Sign in'}
					>
						<Icon name="user" />
						{isAuth && <span className="navbar__dot" />}
					</Link>

					<Link
						to="/wishlist"
						className="navbar__icon-btn"
						aria-label={`Wishlist, ${wishCount} items`}
					>
						<Icon name="heart" />
						{wishCount > 0 && (
							<span className="navbar__count">{wishCount}</span>
						)}
					</Link>

					<button
						className="navbar__icon-btn"
						aria-label={`Cart, ${cartCount} items`}
						aria-expanded={cartOpen}
						onClick={() => dispatch(openCart())}
					>
						<Icon name="bag" />
						{cartCount > 0 && (
							<span className="navbar__count">{cartCount}</span>
						)}
					</button>
				</div>
			</div>

			{/* Search bar */}
			<AnimatePresence>
				{searchOpen && (
					<motion.form
						className="navbar__search container"
						onSubmit={submitSearch}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25 }}
					>
						<Icon
							name="search"
							size={20}
						/>
						<input
							autoFocus
							type="search"
							value={term}
							onChange={e => setTerm(e.target.value)}
							placeholder="Search for products, brands, styles…"
							aria-label="Search products"
						/>
						<button
							type="submit"
							className="btn btn--sm"
						>
							Search
						</button>
					</motion.form>
				)}
			</AnimatePresence>

			{/* Mobile menu */}
			<AnimatePresence>
				{menuOpen && (
					<>
						<motion.div
							className="navbar__scrim"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setMenuOpen(false)}
						/>
						<motion.aside
							className="navbar__mobile"
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ type: 'tween', duration: 0.3 }}
						>
							<div className="navbar__mobile-head">
								<span className="navbar__logo">LUXE</span>
								<button
									className="navbar__icon-btn"
									aria-label="Close menu"
									onClick={() => setMenuOpen(false)}
								>
									<Icon name="close" />
								</button>
							</div>
							<nav className="navbar__mobile-nav">
								<Link
									to="/shop"
									onClick={() => goCategory('all')}
								>
									All Products
								</Link>
								{CATEGORIES.map(c => (
									<Link
										key={c.id}
										to={`/shop/${c.id}`}
										onClick={() => goCategory(c.id)}
									>
										{c.title}
									</Link>
								))}
								<hr />
								<Link
									to="/wishlist"
									onClick={() => setMenuOpen(false)}
								>
									Wishlist {wishCount > 0 && `(${wishCount})`}
								</Link>
								<Link
									to="/account"
									onClick={() => setMenuOpen(false)}
								>
									{isAuth ? 'My Account' : 'Sign in'}
								</Link>
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</header>
	)
}
