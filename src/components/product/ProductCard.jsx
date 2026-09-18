import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "@/components/common/Icon.jsx";
import Price from "@/components/common/Price.jsx";
import ColorSwatches from "@/components/common/ColorSwatches.jsx";
import { useAppDispatch, useAppSelector } from "@/store/hooks.js";
import { toggleWishlist, selectWishlistIds } from "@/store/wishlistSlice.js";
import { openQuickView, addToast } from "@/store/uiSlice.js";
import "./ProductCard.scss";

export default function ProductCard({ product, index = 0 }) {
  const dispatch = useAppDispatch();
  const wishlistIds = useAppSelector(selectWishlistIds);
  const wished = wishlistIds.includes(product.id);

  const onWish = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product.id));
    dispatch(
      addToast(
        wished ? "Removed from wishlist" : "Added to wishlist",
        wished ? "info" : "success"
      )
    );
  };

  const onQuickView = (e) => {
    e.preventDefault();
    dispatch(openQuickView(product.id));
  };

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link to={`/product/${product.id}`} className="product-card__media">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="product-card__img product-card__img--primary"
        />
        <img
          src={product.hoverImageUrl}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="product-card__img product-card__img--hover"
        />

        <div className="product-card__badges">
          {product.isNew && <span className="badge badge--new">New</span>}
          {product.onSale && (
            <span className="badge badge--sale">-{product.discountPct}%</span>
          )}
        </div>

        <button
          className={`product-card__wish ${wished ? "is-active" : ""}`}
          onClick={onWish}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
        >
          <Icon name="heart" size={18} filled={wished} />
        </button>

        <button className="product-card__quick" onClick={onQuickView}>
          <Icon name="eye" size={18} />
          Quick view
        </button>
      </Link>

      <Link to={`/product/${product.id}`} className="product-card__info">
        <span className="product-card__brand">{product.brand}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__foot">
          <Price value={product.price} was={product.priceWas} />
          <ColorSwatches colors={product.colors} size={14} max={4} />
        </div>
      </Link>
    </motion.article>
  );
}
