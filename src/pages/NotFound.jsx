import { Link } from 'react-router-dom'
import './NotFound.scss'

export default function NotFound() {
	return (
		<section className="not-found container section">
			<p className="overline">Error 404</p>
			<h1 className="not-found__title">Page not found</h1>
			<p className="not-found__text">
				The page you're looking for doesn't exist or has moved.
			</p>
			<Link
				to="/"
				className="btn"
			>
				Back to home
			</Link>
		</section>
	)
}
