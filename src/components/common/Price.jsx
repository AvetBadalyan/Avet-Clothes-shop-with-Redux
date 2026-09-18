export const formatPrice = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

export default function Price({ value, was, className = "" }) {
  return (
    <span className={`price ${className}`}>
      <span className="price__now">{formatPrice(value)}</span>
      {was && was > value && (
        <span className="price__was">{formatPrice(was)}</span>
      )}
    </span>
  );
}
