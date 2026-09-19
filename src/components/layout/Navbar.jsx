import Icon from '@/components/common/Icon.jsx'
import { CATEGORIES } from '@/data/products.js'
import { useDebounce } from '@/hooks/useDebounce.js'
import { useFocusTrap } from '@/hooks/useFocusTrap.js'
import { useModalDismiss } from '@/hooks/useModalDismiss.js'
import { selectIsAuthenticated, selectUser } from '@/store/authSlice.js'
import { selectCartCount } from '@/store/cartSlice.js'
import { setCategory, setSearch } from '@/store/filtersSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import {
  openCart,
  selectCartOpen,
  selectTheme,
  toggleTheme
} from '@/store/uiSlice.js'
import { selectWishlistCount } from '@/store/wishlistSlice.js'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.scss'

export default function Navbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const cartCount = useAppSelector(selectCartCount)
  const wishCount = useAppSelector(selectWishlistCount)
  const isAuth = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const cartOpen = useAppSelector(selectCartOpen)
  const theme = useAppSelector(selectTheme)

  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [term, setTerm] = useState('')

  // Debounce search term (300ms) so we filter as the user types
  // without dispatching on every keystroke.
  const debouncedTerm = useDebounce(term, 300)

  // Sync the debounced term into Redux. This effect has a single job —
  // keep the search filter in step with the input. Navigation and category
  // are handled separately (below / by the Shop route), so they don't race.
  const trimmed = debouncedTerm.trim()
  useEffect(() => {
    dispatch(setSearch(trimmed))
  }, [trimmed, dispatch])

  // When the user starts typing a query from somewhere other than the shop,
  // take them to the shop so they can see results. We only navigate — we do
  // not touch the category, so the current /shop/:categoryId stays intact.
  const onShop = location.pathname.startsWith('/shop')
  useEffect(() => {
    if (trimmed && !onShop) {
      navigate('/shop')
    }
  }, [trimmed, onShop, navigate])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu when resizing to desktop (prevents menu staying open after resize).
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const handleChange = (e) => {
      if (e.matches && menuOpen) {
        setMenuOpen(false)
      }
    }
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [menuOpen])

  // Trap focus + close on Escape while the mobile menu is open.
  const menuRef = useRef(null)
  useFocusTrap(menuRef, menuOpen)
  useModalDismiss(menuOpen, () => setMenuOpen(false))

  const submitSearch = (e) => {
    e.preventDefault()
    // Filtering already happens via the debounced effect. Pressing Enter is a
    // shortcut: flush the search immediately, then close the bar and make sure
    // we're on the shop page. Category is left untouched.
    const value = term.trim()
    if (!value) return
    dispatch(setSearch(value))
    setSearchOpen(false)
    setMenuOpen(false)
    if (!location.pathname.startsWith('/shop')) {
      navigate('/shop')
    }
  }

  const goCategory = (id) => {
    // Clearing the local term also clears the debounced search (via the sync
    // effect), so picking a category doesn't leave a stale query fighting it.
    setTerm('')
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
            aria-label="Home"
          >
            MODERN
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
            {CATEGORIES.map((c) => (
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
            className="navbar__icon-btn navbar__theme-toggle"
            aria-label={
              theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            }
            onClick={() => dispatch(toggleTheme())}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>

          <button
            className="navbar__icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Icon name="search" />
          </button>

          <Link
            to="/account"
            className="navbar__icon-btn navbar__account"
            aria-label={isAuth ? `Account: ${user?.name}` : 'Sign in'}
          >
            <Icon name="user" />
            {isAuth && (
              <span
                className="navbar__dot"
                aria-hidden="true"
              />
            )}
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
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search for products, brands, styles…"
              aria-label="Search products"
            />
            {term && (
              <button
                type="button"
                className="navbar__search-clear"
                aria-label="Clear search"
                onClick={() => setTerm('')}
              >
                <Icon
                  name="close"
                  size={18}
                />
              </button>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      {/* Mobile menu - rendered via portal to escape header stacking context */}
      {createPortal(
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
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="navbar__mobile-head">
                  <span className="navbar__logo">MODERN</span>
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
                  {CATEGORIES.map((c) => (
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
        </AnimatePresence>,
        document.body
      )}
    </header>
  )
}
