import Icon from '@/components/common/Icon.jsx'
import { CATEGORIES } from '@/data/products.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'

const perks = [
  { icon: 'truck', title: 'Free shipping', text: 'On all orders over $150' },
  { icon: 'refresh', title: 'Easy returns', text: '30-day free returns' },
  { icon: 'shield', title: 'Secure checkout', text: 'Encrypted & protected' }
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setDone(true)
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      <div className="footer__perks container">
        {perks.map((p) => (
          <div
            className="footer__perk"
            key={p.title}
          >
            <Icon
              name={p.icon}
              size={26}
            />
            <div>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="footer__main container">
        <div className="footer__brand">
          <span className="footer__logo">MODERN</span>
          <p>
            Considered fashion for the modern wardrobe. Designed to last, styled
            to move.
          </p>
        </div>

        <div className="footer__col">
          <h4>Shop</h4>
          <Link to="/shop">All Products</Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`/shop/${c.id}`}
            >
              {c.title}
            </Link>
          ))}
        </div>

        <div className="footer__col">
          <h4>Help</h4>
          <Link to="/shipping-returns">Shipping &amp; Returns</Link>
          <Link to="/size-guide">Size Guide</Link>
          <Link to="/account">Track Order</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer__newsletter">
          <h4>Join the list</h4>
          <p>Early access to new arrivals and members-only offers.</p>
          {done ? (
            <p
              className="footer__thanks"
              role="status"
            >
              <Icon
                name="check"
                size={18}
              />{' '}
              You're on the list.
            </p>
          ) : (
            <form onSubmit={subscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
              />
              <button
                type="submit"
                aria-label="Subscribe"
              >
                <Icon
                  name="arrowRight"
                  size={20}
                />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} MODERN. All rights reserved.</span>
        <span className="footer__made">Built with React & Redux Toolkit</span>
      </div>
    </footer>
  )
}
