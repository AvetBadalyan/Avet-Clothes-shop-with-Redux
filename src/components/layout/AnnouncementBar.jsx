import './AnnouncementBar.scss'

const messages = [
	'Free express shipping on orders over $150',
	'Complimentary returns within 30 days',
	'New season · New arrivals dropping weekly'
]

export default function AnnouncementBar() {
	return (
		<div
			className="announcement"
			role="region"
			aria-label="Store announcements"
		>
			<div className="announcement__track">
				{[...messages, ...messages].map((m, i) => (
					<span
						key={`${i}-${m}`}
						className="announcement__item"
					>
						{m}
					</span>
				))}
			</div>
		</div>
	)
}
