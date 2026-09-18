/**
 * Format a number as USD currency without decimals.
 * @param {number} n - The price value to format
 * @returns {string} Formatted price string (e.g., "$150")
 */
export const formatPrice = (n) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(n)
