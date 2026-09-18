import Icon from '@/components/common/Icon.jsx'
import ProductCard from '@/components/product/ProductCard.jsx'
import { getProductById } from '@/data/products.js'
import { useAppDispatch, useAppSelector } from '@/store/hooks.js'
import { usePageTitle } from '@/hooks/usePageTitle.js'
import { clearWishlist, selectWishlistIds } from '@/store/wishlistSlice.js'
import { useNavigate } from 'react-router-dom'
import './Wishlist.scss'

export default function Wishlist() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	usePageTitle('Wishlist')
	const ids = useAppSelector(selectWishlistIds)
	const products = ids.map(getProductById).filter(Boolean)

	return (
		<div className="wishlist">
			<header className="wishlist__head container">
				<div>
					<p className="overline">Saved for later</p>
					<h1 className="wishlist__title">Your wishlist</h1>
					<p className="wishlist__count">
						{products.length} {products.length === 1 ? 'item' : 'items'}
					</p>
				</div>
				{products.length > 0 && (
					<button
						className="btn btn--ghost btn--sm"
						onClick={() => dispatch(clearWishlist())}
					>
						<Icon
							name="trash"
							size={16}
						/>{' '}
						Clear all
					</button>
				)}
			</header>

			<div className="container">
				{products.length > 0 ? (
					<div className="product-grid wishlist__grid">
						{products.map((p, i) => (
							<ProductCard
								key={p.id}
								product={p}
								index={i}
							/>
						))}
					</div>
				) : (
					<div className="wishlist__empty">
						<Icon
							name="heart"
							size={48}
						/>
						<h3>Your wishlist is empty</h3>
						<p>Tap the heart on any product to save it here for later.</p>
						<button
							className="btn"
							onClick={() => navigate('/shop')}
						>
							Explore products
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
