/**
 * Display label for a size. Accessories use the "OS" (one size) code, which
 * we show to shoppers as "One size".
 * @param {string} size
 * @returns {string}
 */
export const formatSize = (size) => (size === "OS" ? "One size" : size);

/**
 * True when a product has no real size choice (a single "OS" size), e.g.
 * accessories. Used to hide the size selector.
 * @param {{ sizes: string[] }} product
 * @returns {boolean}
 */
export const isOneSize = (product) =>
  product.sizes.length === 1 && product.sizes[0] === "OS";
