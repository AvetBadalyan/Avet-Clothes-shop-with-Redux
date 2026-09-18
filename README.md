# LUXE — Modern Fashion Storefront

A polished, responsive fashion e-commerce front end built with **React 19**,
**Redux Toolkit** and **Vite**. LUXE goes beyond a basic cart demo: it models a
real clothing store with size and color variants, faceted filtering, a wishlist,
quick-view, and a complete checkout flow — all self-contained and deployable as
a static site.

> This is a 2024/25 ground-up rebuild of an older Create React App + classic
> Redux project. See [Migration notes](#migration-notes).

**Live demo:** _add your Vercel URL here_

> Add screenshots to `docs/screenshots/` and reference them here once deployed.

---

## Features

### Shopping experience

- **Curated catalog** of 26 products across Women, Men, Shoes and Accessories
- **Size selector** (XS–XL / EU shoe sizes) with add-to-cart validation
- **Color variants** shown as interactive swatches on cards and product pages
- **Product quick-view modal** — pick size/color and add to bag without leaving
  the grid
- **Product detail pages** with an image gallery, ratings, and delivery info
- **"Complete the look"** styling suggestions plus related-product
  recommendations

### Discovery & filtering

- **Faceted filter sidebar**: brand, price range, size, color, "new", "on sale"
- **Sort** by popularity, newest, price (asc/desc) and rating
- **Search** across product name, brand, category and tags
- **Category routes** (`/shop/:categoryId`) that stay in sync with the filter
  state
- Live result counts, active-filter badges, and one-tap clear

### Cart, wishlist & checkout

- **Slide-out cart drawer** with quantity controls and a free-shipping progress
  bar
- **Size + color aware line items** (the same product in two sizes is two lines)
- **Wishlist / favorites** with a dedicated page
- **Checkout** with form validation and an animated order confirmation
- **Cart and wishlist persist** to `localStorage` across reloads

### Accounts

- **Sign up / sign in** with a mock auth service that issues a JWT-shaped token
- Auth is isolated behind a single `authService` module, so it can be swapped
  for **Supabase Auth** (or any provider) without touching the UI

### Craft

- Fully **responsive** from mobile to widescreen
- **Framer Motion** page and component animations, with `prefers-reduced-motion`
  support
- Toast notifications, skeleton shimmers, empty states, and keyboard-dismissable
  overlays
- Accessible markup: semantic landmarks, `aria-*` on interactive controls,
  visible focus rings

---

## Tech stack

| Area       | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | React 19                                 |
| Build tool | Vite 6                                   |
| State      | Redux Toolkit + React-Redux              |
| Routing    | React Router 7                           |
| Styling    | Modern SCSS (design tokens, mixins, BEM) |
| Animation  | Framer Motion                            |
| Images     | Unsplash CDN (responsive params)         |
| Deploy     | Vercel                                   |

---

## Getting started

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# production build
npm run build

# preview the production build locally
npm run preview

# lint
npm run lint
```

Requires Node 18+ (developed on Node 22).

---

## Project structure

```
src/
├─ components/
│  ├─ cart/         CartDrawer, CartLine
│  ├─ common/       Icon, Price, StarRating, ColorSwatches, ToastStack, ScrollToTop
│  ├─ layout/       Navbar, Footer, AnnouncementBar, Layout
│  ├─ product/      ProductCard, QuickViewModal, SizeSelector
│  └─ shop/         FilterSidebar
├─ data/            products.js (catalog + helpers)
├─ pages/           Home, Shop, ProductDetail, Wishlist, Checkout, Auth, NotFound
├─ services/        authService.js (swappable auth layer)
├─ store/           Redux Toolkit slices (cart, wishlist, filters, auth, ui)
└─ styles/          abstracts (tokens/mixins), base (reset/utilities), main.scss
```

### State model

| Slice      | Responsibility                                                             |
| ---------- | -------------------------------------------------------------------------- |
| `cart`     | Line items keyed by `id::size::color`, subtotal & count selectors          |
| `wishlist` | Set of favorited product ids                                               |
| `filters`  | Category, search, brand, size, color, price, sort + memoized filtered list |
| `auth`     | User/session via async thunks over `authService`                           |
| `ui`       | Cart drawer, mobile filters, quick-view, and toast queue                   |

`cart` and `wishlist` are persisted to `localStorage` via a store subscriber.

---

## Design system

Styling uses plain SCSS organized with a light
[7-1-ish](https://sass-guidelines.org/architecture/) structure:

- **`abstracts/`** — design tokens (color, type scale, spacing, radius, shadow,
  breakpoints) and mixins (`bp()`, layout helpers, `focus-ring`, `clamp-lines`).
  Auto-injected into every stylesheet via Vite's `additionalData`.
- **`base/`** — reset and reusable utility classes (`.btn`, `.badge`, `.field`,
  `.container`, skeleton shimmer).
- Component styles are co-located `.scss` files using BEM naming.

---

## Migration notes

The original project (2022) was Create React App with classic Redux
(`createStore`), `redux-logger`, `node-sass`, and data fetched from a
now-defunct Firebase Realtime Database. This rebuild:

- Migrated **CRA → Vite** and **React 18 → 19**
- Replaced **classic Redux → Redux Toolkit** (slices, thunks, memoized
  selectors)
- Swapped **`node-sass` → `sass`** with a proper token/mixin architecture
- Removed the dead Firebase backend in favor of a **self-contained catalog**
- Added real e-commerce features (variants, filtering, wishlist, quick-view,
  checkout)

---

## Roadmap

- Swap mock auth for **Supabase Auth** (JWT + row-level security)
- Persist orders and wishlist server-side
- Product reviews and inventory
- Unit/integration tests (Vitest + Testing Library)

---

## License

MIT — free to use as a portfolio reference.
