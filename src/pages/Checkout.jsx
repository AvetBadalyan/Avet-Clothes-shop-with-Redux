import Icon from '@/components/common/Icon.jsx'
import { usePageTitle } from '@/hooks/usePageTitle.js'
import { authService } from '@/services/authService.js'
import { createOrder, orderService } from '@/services/orderService.js'
import { selectUser } from '@/store/authSlice.js'
import {
  clearCart,
  selectCartItems,
  selectCartSubtotal
} from '@/store/cartSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { addToast } from '@/store/uiSlice.js'
import { formatPrice } from '@/utils/formatPrice.js'
import { formatSize } from '@/utils/productHelpers.js'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
  usePageTitle('Checkout')
  const navigate = useNavigate()
  const items = useAppSelector(selectCartItems)
  const subtotal = useAppSelector(selectCartSubtotal)
  const user = useAppSelector(selectUser)

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [placed, setPlaced] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [isPlacing, setIsPlacing] = useState(false)

  // Auto-fill form from saved address (for signed-in users) or basic user info
  useEffect(() => {
    if (user) {
      const savedAddress = authService.getAddress(user.email)
      if (savedAddress) {
        // Use saved address (full auto-fill for returning customers)
        setForm({
          fullName: savedAddress.fullName || user.name || '',
          email: savedAddress.email || user.email || '',
          address: savedAddress.address || '',
          city: savedAddress.city || '',
          postalCode: savedAddress.postalCode || '',
          country: savedAddress.country || ''
        })
      } else {
        // First-time signed-in user: just fill name and email
        setForm((f) => ({
          ...f,
          fullName: user.name || '',
          email: user.email || ''
        }))
      }
    }
  }, [user])

  const shipping = subtotal >= SHIP_THRESHOLD || subtotal === 0 ? 0 : SHIP_COST
  const total = subtotal + shipping

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
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

  const placeOrder = async (e) => {
    e.preventDefault()
    // Guard against double-submit (double-click / Enter spam creating dupes).
    if (isPlacing) return
    if (!validate()) {
      dispatch(addToast('Please check the highlighted fields', 'error'))
      return
    }

    const shippingAddress = {
      fullName: form.fullName,
      email: form.email,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      country: form.country
    }

    // Build the order — keyed by checkout email for reconciliation
    const newOrder = createOrder({
      items,
      subtotal,
      shipping,
      total,
      shippingAddress
    })

    setIsPlacing(true)
    try {
      // orderService.add throws if persistence fails (e.g. storage full).
      orderService.add(newOrder)

      // Save shipping address for signed-in users (faster future checkouts)
      if (user) {
        authService.saveAddress(user.email, shippingAddress)
      }

      // Only show the confirmation once the order is safely persisted.
      setOrderData(newOrder)
      setPlaced(true)
      dispatch(clearCart())
      dispatch(addToast('Order placed successfully'))
      window.scrollTo({ top: 0 })
    } catch (err) {
      dispatch(
        addToast(
          err.message ?? 'Something went wrong placing your order',
          'error'
        )
      )
    } finally {
      setIsPlacing(false)
    }
  }

  // --- Confirmation --------------------------------------------------------
  if (placed && orderData) {
    const isGuest = !user

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

          {/* Account creation prompt for guest users */}
          {isGuest && (
            <div className="checkout-confirm__account-prompt">
              <Icon
                name="user"
                size={20}
              />
              <div className="checkout-confirm__account-text">
                <strong>Create an account to track this order</strong>
                <p>
                  Save your details for faster checkout and view your order
                  history anytime.
                </p>
              </div>
              <Link
                to="/account"
                state={{
                  prefillEmail: orderData.shippingAddress.email,
                  prefillName: orderData.shippingAddress.fullName,
                  mode: 'signup'
                }}
                className="btn btn--sm"
              >
                Create account
              </Link>
            </div>
          )}

          <div className="checkout-confirm__actions">
            <button
              className="btn"
              onClick={() => navigate('/account', { state: { tab: 'orders' } })}
            >
              {isGuest ? 'Sign in' : 'View order history'}
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
                autoComplete="name"
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
                autoComplete="email"
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
                autoComplete="address-line1"
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
                  autoComplete="address-level2"
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
                  autoComplete="postal-code"
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
                autoComplete="country-name"
              />
              {errors.country && (
                <em className="field__err">{errors.country}</em>
              )}
            </label>
          </fieldset>

          <button
            className="btn btn--block checkout__submit"
            type="submit"
            disabled={isPlacing}
            aria-busy={isPlacing}
          >
            <Icon
              name="shield"
              size={18}
            />{' '}
            {isPlacing
              ? 'Placing order…'
              : `Place order · ${formatPrice(total)}`}
          </button>
          <p className="checkout__disclaimer">
            This is a demo store. No payment is taken and no order is shipped.
          </p>
        </form>

        {/* Order summary */}
        <aside className="checkout__summary">
          <h2>Order summary</h2>
          <ul className="checkout__lines">
            {items.map((item) => (
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
                    {item.color} · {formatSize(item.size)}
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
