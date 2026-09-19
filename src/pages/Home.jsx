import Icon from '@/components/common/Icon.jsx'
import ProductCard from '@/components/product/ProductCard.jsx'
import { CATEGORIES, PRODUCTS, img } from '@/data/products.js'
import { usePageTitle } from '@/hooks/usePageTitle.js'
import { setCategory, setNewOnly, setSearch } from '@/store/filtersSlice.js'
import { useAppDispatch } from '@/store/hooks.js'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.scss'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Home() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  usePageTitle(null) // Home — use base title

  // Memoized: PRODUCTS is a static module-level constant so these never
  // change, but useMemo documents intent and guards against future mutations.
  const newArrivals = useMemo(
    () => PRODUCTS.filter((p) => p.isNew).slice(0, 4),
    []
  )
  const onSale = useMemo(() => PRODUCTS.filter((p) => p.onSale).slice(0, 4), [])
  const bestSellers = useMemo(
    () => [...PRODUCTS].sort((a, b) => b.popularity - a.popularity).slice(0, 8),
    []
  )

  const goShop = (category = 'all') => {
    dispatch(setSearch(''))
    dispatch(setCategory(category))
    navigate(category === 'all' ? '/shop' : `/shop/${category}`)
  }

  return (
    <div className="home">
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <img
          className="hero__bg"
          src={img('photo-1490481651871-ab68de25d43d', 1600)}
          alt=""
          aria-hidden="true"
        />
        <div className="hero__overlay" />
        <div className="hero__content container">
          <motion.p
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Autumn / Winter Collection
          </motion.p>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Dress with
            <br />
            intention.
          </motion.h1>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Considered essentials and statement pieces, crafted to move with you
            season after season.
          </motion.p>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              className="btn"
              onClick={() => goShop('women')}
            >
              Shop Women
            </button>
            <button
              className="btn btn--outline hero__cta-alt"
              onClick={() => goShop('men')}
            >
              Shop Men
            </button>
          </motion.div>
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="section container">
        <header className="section-head">
          <div>
            <p className="overline">Browse</p>
            <h2 className="section-head__title">Shop by category</h2>
          </div>
          <Link
            to="/shop"
            className="section-head__link"
            onClick={() => goShop()}
          >
            View all{' '}
            <Icon
              name="arrowRight"
              size={18}
            />
          </Link>
        </header>

        <div className="category-grid">
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.id}
              className={`category-card category-card--${i === 0 ? 'wide' : ''}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              onClick={() => goShop(c.id)}
            >
              <img
                src={img(c.image, 800)}
                alt={c.title}
                loading="lazy"
              />
              <span className="category-card__overlay" />
              <span className="category-card__body">
                <span className="category-card__tag">{c.tagline}</span>
                <span className="category-card__title">{c.title}</span>
                <span className="category-card__cta">
                  Shop now{' '}
                  <Icon
                    name="arrowRight"
                    size={16}
                  />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ---------------- New arrivals ---------------- */}
      <section className="section container">
        <header className="section-head">
          <div>
            <p className="overline">Just dropped</p>
            <h2 className="section-head__title">New arrivals</h2>
          </div>
          <button
            className="section-head__link"
            onClick={() => {
              dispatch(setNewOnly(true))
              goShop()
            }}
          >
            See all new{' '}
            <Icon
              name="arrowRight"
              size={18}
            />
          </button>
        </header>
        <div className="product-grid">
          {newArrivals.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ---------------- Editorial banner ---------------- */}
      <section className="editorial">
        <img
          src={img('photo-1483985988355-763728e1935b', 1400)}
          alt=""
          className="editorial__img"
          loading="lazy"
        />
        <div className="editorial__panel">
          <p className="overline">The edit</p>
          <h2>Timeless layers for the season ahead</h2>
          <p>
            From tailored coats to featherweight knits, discover the pieces our
            stylists are reaching for right now.
          </p>
          <button
            className="btn"
            onClick={() => goShop()}
          >
            Explore the collection
          </button>
        </div>
      </section>

      {/* ---------------- Best sellers ---------------- */}
      <section className="section container">
        <header className="section-head">
          <div>
            <p className="overline">Loved by everyone</p>
            <h2 className="section-head__title">Best sellers</h2>
          </div>
        </header>
        <div className="product-grid">
          {bestSellers.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ---------------- Sale strip ---------------- */}
      {onSale.length > 0 && (
        <section className="section container">
          <header className="section-head">
            <div>
              <p className="overline overline--sale">Limited time</p>
              <h2 className="section-head__title">On sale now</h2>
            </div>
          </header>
          <div className="product-grid">
            {onSale.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
