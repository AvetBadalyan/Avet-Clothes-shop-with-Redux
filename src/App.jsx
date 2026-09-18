import ErrorBoundary from '@/components/common/ErrorBoundary.jsx'
import RouteFallback from '@/components/common/RouteFallback.jsx'
import ScrollToTop from '@/components/common/ScrollToTop.jsx'
import Layout from '@/components/layout/Layout.jsx'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// Route-level code splitting: each page ships as its own chunk so the initial
// bundle only carries the shell plus the first route the visitor lands on.
const Home = lazy(() => import('@/pages/Home.jsx'))
const Shop = lazy(() => import('@/pages/Shop.jsx'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail.jsx'))
const Wishlist = lazy(() => import('@/pages/Wishlist.jsx'))
const Checkout = lazy(() => import('@/pages/Checkout.jsx'))
const Auth = lazy(() => import('@/pages/Auth.jsx'))
const NotFound = lazy(() => import('@/pages/NotFound.jsx'))

export default function App() {
	return (
		<ErrorBoundary>
			<ScrollToTop />
			<Suspense fallback={<RouteFallback />}>
				<Routes>
					<Route
						path="/"
						element={<Layout />}
					>
						<Route
							index
							element={<Home />}
						/>
						<Route
							path="shop"
							element={<Shop />}
						/>
						<Route
							path="shop/:categoryId"
							element={<Shop />}
						/>
						<Route
							path="product/:productId"
							element={<ProductDetail />}
						/>
						<Route
							path="wishlist"
							element={<Wishlist />}
						/>
						<Route
							path="checkout"
							element={<Checkout />}
						/>
						<Route
							path="account"
							element={<Auth />}
						/>
						<Route
							path="*"
							element={<NotFound />}
						/>
					</Route>
				</Routes>
			</Suspense>
		</ErrorBoundary>
	)
}
