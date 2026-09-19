import ColorSwatches from '@/components/common/ColorSwatches.jsx'
import Icon from '@/components/common/Icon.jsx'
import Price from '@/components/common/Price.jsx'
import StarRating from '@/components/common/StarRating.jsx'
import ProductCard from '@/components/product/ProductCard.jsx'
import SizeGuideModal from '@/components/product/SizeGuideModal.jsx'
import SizeSelector from '@/components/product/SizeSelector.jsx'
import {
    getCompleteTheLook,
    getProductById,
    getRelated
} from '@/data/products.js'
import { usePageTitle } from '@/hooks/usePageTitle.js'
import { recentlyViewedService } from '@/services/recentlyViewedService.js'
import { addToCart } from '@/store/cartSlice.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { addToast, openCart } from '@/store/uiSlice.js'
import { toggleWishlist } from '@/store/wishlistSlice.js'
import { isOneSize } from '@/utils/productHelpers.js'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ProductDetail.scss'

const perks = [
	{ icon: 'truck', text: 'Free shipping over $150' },
	{ icon: 'refresh', text: 'Free 30-day returns' },
	{ icon: 'shield', text: 'Secure checkout' }
]

export default function ProductDetail() {
	const { productId } = useParams()
	const dispatch = useAppDispatch()

	const product = getProductById(productId)
	// Select only the boolean this page needs (narrow subscription).
	const wished = useAppSelector(state =>
		product ? state.wishlist.ids.includes(product.id) : false
	)

	// Hooks must be called unconditionally — use a fallback title when no product
	usePageTitle(product?.name ?? 'Product Not Found')

	const [size, setSize] = useState(null)
	const [color, setColor] = useState(null)
	const [qty, setQty] = useState(1)
	const [error, setError] = useState(false)
	const [activeImg, setActiveImg] = useState(0)
	const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
	const [recentIds, setRecentIds] = useState([])

	useEffect(() => {
		if (product) {
			setColor(product.colors[0]?.name ?? null)
			setSize(product.sizes.length === 1 ? product.sizes[0] : null)
			setQty(1)
			setError(false)
			setActiveImg(0)
			// Capture what was viewed *before* this product, then record this one.
			setRecentIds(recentlyViewedService.list())
			recentlyViewedService.add(product.id)
		}
	}, [productId, product])

	if (!product) {
		return (
			<section
				className="container section"
				style={{ textAlign: 'center' }}
			>
				<h1>Product not found</h1>
				<p style={{ color: 'var(--color-slate)', marginBlock: '1rem' }}>
					This product may have sold out or been removed.
				</p>
				<Link
					to="/shop"
					className="btn"
				>
					Back to shop
				</Link>
			</section>
		)
	}

	const gallery = [product.imageUrl, product.hoverImageUrl]
	const related = getRelated(product)
	const look = getCompleteTheLook(product)
	const isAccessory = isOneSize(product)
	const recentlyViewed = recentIds
		.filter(id => id !== product.id)
		.map(getProductById)
		.filter(Boolean)
		.slice(0, 4)

	const handleAdd = () => {
		if (!size) {
			setError(true)
			// Toast + scroll so the shopper gets feedback even when adding from
			// the sticky bar with the size selector scrolled out of view.
			dispatch(addToast('Please select a size', 'error'))
			document
				.querySelector('.pdp__selector .size-selector')
				?.scrollIntoView({ behavior: 'smooth', block: 'center' })
			return
		}
		dispatch(addToCart({ product, size, color, quantity: qty }))
		dispatch(addToast(`${product.name} added to bag`))
		dispatch(openCart())
	}

	return (
		<div className="pdp">
			<nav
				className="pdp__crumbs container"
				aria-label="Breadcrumb"
			>
				<Link to="/">Home</Link>
				<Icon
					name="chevronRight"
					size={14}
				/>
				<Link to={`/shop/${product.category}`}>{product.categoryTitle}</Link>
				<Icon
					name="chevronRight"
					size={14}
				/>
				<span>{product.name}</span>
			</nav>

			<div className="pdp__main container">
				{/* Gallery */}
				<div className="pdp__gallery">
					<div className="pdp__thumbs">
						{gallery.map((src, i) => (
							<button
								key={i}
								className={`pdp__thumb ${activeImg === i ? 'is-active' : ''}`}
								onClick={() => setActiveImg(i)}
								aria-label={`View image ${i + 1}`}
							>
								<img
									src={src}
									alt=""
									loading="lazy"
								/>
							</button>
						))}
					</div>
					<motion.div
						key={activeImg}
						className="pdp__stage"
						initial={{ opacity: 0.4 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<img
							src={gallery[activeImg]}
							alt={product.name}
						/>
						<ProductBadges
							product={product}
							className="pdp__badges"
						/>
					</motion.div>
				</div>

				{/* Details */}
				<div className="pdp__info">
					<span className="overline">{product.brand}</span>
					<h1 className="pdp__name">{product.name}</h1>
					<div className="pdp__meta">
						<StarRating
							value={product.rating}
							reviews={product.reviews}
						/>
					</div>
					<Price
						value={product.price}
						was={product.priceWas}
						className="pdp__price"
					/>

					<p className="pdp__desc">{product.description}</p>

					<div className="pdp__selector">
						<div className="pdp__selector-head">
							<span className="pdp__label">Color</span>
							<span className="pdp__value">{color}</span>
						</div>
						<ColorSwatches
							colors={product.colors}
							selected={color}
							onSelect={setColor}
							size={28}
						/>
					</div>

					{!isAccessory && (
						<div className="pdp__selector">
							<div className="pdp__selector-head">
								<span className="pdp__label">
									Size
									{error && (
										<em className="pdp__err"> · please select a size</em>
									)}
								</span>
								<button
									type="button"
									className="pdp__guide"
									onClick={() => setSizeGuideOpen(true)}
								>
									Size guide
								</button>
							</div>
							<SizeSelector
								sizes={product.sizes}
								selected={size}
								onSelect={s => {
									setSize(s)
									setError(false)
								}}
								error={error}
							/>
						</div>
					)}

					<div className="pdp__buy">
						<div
							className="pdp__qty"
							role="group"
							aria-label="Quantity"
						>
							<button
								onClick={() => setQty(q => Math.max(1, q - 1))}
								aria-label="Decrease quantity"
								disabled={qty <= 1}
							>
								<Icon
									name="minus"
									size={16}
								/>
							</button>
							<span>{qty}</span>
							<button
								onClick={() => setQty(q => Math.min(10, q + 1))}
								aria-label="Increase quantity"
								disabled={qty >= 10}
							>
								<Icon
									name="plus"
									size={16}
								/>
							</button>
						</div>

						<button
							className="btn pdp__add"
							onClick={handleAdd}
						>
							<Icon
								name="bag"
								size={18}
							/>{' '}
							Add to bag
						</button>

						<button
							className={`pdp__wish ${wished ? 'is-active' : ''}`}
							onClick={() => dispatch(toggleWishlist(product.id))}
							aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
							aria-pressed={wished}
						>
							<Icon
								name="heart"
								size={20}
								filled={wished}
							/>
						</button>
					</div>

					<ul className="pdp__perks">
						{perks.map(p => (
							<li key={p.text}>
								<Icon
									name={p.icon}
									size={18}
								/>
								{p.text}
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Complete the look */}
			{look.length > 0 && (
				<section className="section container">
					<header className="section-head">
						<div>
							<p className="overline">Styled by us</p>
							<h2 className="section-head__title">Complete the look</h2>
						</div>
					</header>
					<div className="product-grid">
						{look.map((p, i) => (
							<ProductCard
								key={p.id}
								product={p}
								index={i}
							/>
						))}
					</div>
				</section>
			)}

			{/* Related */}
			{related.length > 0 && (
				<section className="section container">
					<header className="section-head">
						<div>
							<p className="overline">More from {product.categoryTitle}</p>
							<h2 className="section-head__title">You may also like</h2>
						</div>
						<Link
							to={`/shop/${product.category}`}
							className="section-head__link"
						>
							View all{' '}
							<Icon
								name="arrowRight"
								size={18}
							/>
						</Link>
					</header>
					<div className="product-grid">
						{related.map((p, i) => (
							<ProductCard
								key={p.id}
								product={p}
								index={i}
							/>
						))}
					</div>
				</section>
			)}

			{/* Recently viewed */}
			{recentlyViewed.length > 0 && (
				<section className="section container">
					<header className="section-head">
						<div>
							<p className="overline">Pick up where you left off</p>
							<h2 className="section-head__title">Recently viewed</h2>
						</div>
					</header>
					<div className="product-grid">
						{recentlyViewed.map((p, i) => (
							<ProductCard
								key={p.id}
								product={p}
								index={i}
							/>
						))}
					</div>
				</section>
			)}

			{/* Sticky add-to-bag bar — mobile only, keeps the primary action
			    reachable while scrolling the long product page. */}
			<div className="pdp__sticky-bar">
				<div className="pdp__sticky-info">
					<span className="pdp__sticky-name">{product.name}</span>
					<Price
						value={product.price}
						was={product.priceWas}
					/>
				</div>
				<button
					className="btn pdp__sticky-add"
					onClick={handleAdd}
				>
					<Icon
						name="bag"
						size={18}
					/>{' '}
					Add to bag
				</button>
			</div>

			<SizeGuideModal
				open={sizeGuideOpen}
				onClose={() => setSizeGuideOpen(false)}
				category={product.category}
			/>
		</div>
	)
}
