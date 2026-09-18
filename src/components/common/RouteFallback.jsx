// Shown while a lazily-loaded route chunk is being fetched. Kept minimal and
// dependency-free so it's part of the initial bundle, not a split chunk.
export default function RouteFallback() {
	return (
		<div
			role="status"
			aria-live="polite"
			style={{
				minHeight: '60vh',
				display: 'grid',
				placeItems: 'center'
			}}
		>
			<span
				className="route-spinner"
				aria-hidden="true"
			/>
			<span className="visually-hidden">Loading…</span>
		</div>
	)
}
