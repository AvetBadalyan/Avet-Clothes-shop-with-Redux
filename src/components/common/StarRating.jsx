import Icon from './Icon.jsx'

// Renders 5 stars with a partial fill for the fractional rating.
export default function StarRating({ value = 0, reviews, size = 14 }) {
  const pct = (Math.max(0, Math.min(5, value)) / 5) * 100
  return (
    <span
      className="stars"
      title={`${value} out of 5`}
    >
      <span
        className="stars__row"
        aria-hidden="true"
      >
        <span className="stars__base">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              name="star"
              size={size}
            />
          ))}
        </span>
        <span
          className="stars__fill"
          style={{ width: `${pct}%` }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              name="star"
              size={size}
              filled
            />
          ))}
        </span>
      </span>
      {reviews != null && <span className="stars__count">({reviews})</span>}
      <span className="visually-hidden">{value} out of 5 stars</span>
    </span>
  )
}
