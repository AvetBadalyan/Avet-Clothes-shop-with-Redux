import Icon from './Icon.jsx'

// Renders 5 stars - filled for whole numbers, empty for the rest.
// For simplicity, we round to nearest whole star (no partial fills).
export default function StarRating({ value = 0, reviews, size = 16 }) {
  const filledCount = Math.round(Math.max(0, Math.min(5, value)))

  return (
    <span className="stars" title={`${value} out of 5`}>
      <span className="stars__row" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon
            key={i}
            name="star"
            size={size}
            filled={i < filledCount}
            className={i < filledCount ? 'stars__filled' : 'stars__empty'}
          />
        ))}
      </span>
      {reviews != null && <span className="stars__count">({reviews})</span>}
      <span className="visually-hidden">{value} out of 5 stars</span>
    </span>
  )
}
