// ============================================================
//  Modern Fashion Store catalog — self-contained product data.
//  Images are served from the Unsplash CDN with responsive params.
// ============================================================

const UNSPLASH = 'https://images.unsplash.com'

/** Build a responsive Unsplash URL from a photo id. */
export const img = (id, w = 800) =>
	`${UNSPLASH}/${id}?w=${w}&q=80&auto=format&fit=crop`

export const CATEGORIES = [
	{
		id: 'women',
		title: 'Women',
		tagline: 'Elevated everyday essentials',
		image: 'photo-1441984904996-e0b6ba687e04'
	},
	{
		id: 'men',
		title: 'Men',
		tagline: 'Modern tailoring & staples',
		image: 'photo-1516257984-b1b4d707412e'
	},
	{
		id: 'shoes',
		title: 'Shoes',
		tagline: 'From sneakers to statement heels',
		image: 'photo-1595950653106-6c9ebd614d3a'
	},
	{
		id: 'accessories',
		title: 'Accessories',
		tagline: 'The finishing touch',
		image: 'photo-1523381210434-271e8be1f52b'
	}
]

export const BRANDS = [
	'Atelier',
	'Nordic Row',
	'Maison Cinq',
	'Kestrel',
	'Loom & Co.',
	'Verano'
]

// Shared option sets
const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL']
const SHOE_SIZES = ['38', '39', '40', '41', '42', '43', '44']
const ONE_SIZE = ['OS']

// Color palette used across variants (name + hex for the swatch)
const C = {
	black: { name: 'Black', hex: '#1c1c1f' },
	white: { name: 'White', hex: '#f4f2ee' },
	sand: { name: 'Sand', hex: '#d8c7ad' },
	camel: { name: 'Camel', hex: '#c19a6b' },
	navy: { name: 'Navy', hex: '#26324a' },
	olive: { name: 'Olive', hex: '#6b6f4a' },
	rust: { name: 'Rust', hex: '#b25334' },
	grey: { name: 'Grey', hex: '#8f9195' },
	cream: { name: 'Cream', hex: '#efe9dc' },
	burgundy: { name: 'Burgundy', hex: '#5c2733' },
	stone: { name: 'Stone', hex: '#b8b0a4' },
	denim: { name: 'Denim', hex: '#4a6079' },
	charcoal: { name: 'Charcoal', hex: '#3a3a3d' }
}

/**
 * Raw catalog. `image` is the primary shot, `hoverImage` swaps in on hover.
 * `priceWas` (optional) marks an item as on sale.
 */
const RAW = [
	// ---------------- WOMEN ----------------
	{
		id: 'w-linen-blazer',
		name: 'Relaxed Linen Blazer',
		category: 'women',
		brand: 'Atelier',
		price: 168,
		priceWas: 210,
		rating: 4.8,
		reviews: 214,
		createdAt: '2024-11-02',
		popularity: 96,
		sizes: APPAREL_SIZES,
		colors: [C.sand, C.black, C.navy],
		tags: ['tailoring', 'linen', 'summer'],
		image: 'photo-1591047139829-d91aecb6caea',
		hoverImage: 'photo-1594633312681-425c7b97ccd1',
		description:
			'A softly structured blazer cut from breathable European linen. Half-lined with a single-button close for an effortless drape.',
		goesWith: ['w-silk-cami', 'w-wide-trouser', 'acc-leather-tote']
	},
	{
		id: 'w-silk-cami',
		name: 'Washed Silk Camisole',
		category: 'women',
		brand: 'Maison Cinq',
		price: 78,
		rating: 4.6,
		reviews: 132,
		createdAt: '2025-01-14',
		popularity: 81,
		sizes: APPAREL_SIZES,
		colors: [C.cream, C.black, C.burgundy],
		tags: ['silk', 'layering'],
		image: 'photo-1485462537746-965f33f7f6a7',
		hoverImage: 'photo-1483985988355-763728e1935b',
		description:
			'A bias-cut camisole in washed silk with adjustable straps. Wears alone in summer or under tailoring year round.',
		goesWith: ['w-linen-blazer', 'w-wide-trouser']
	},
	{
		id: 'w-wide-trouser',
		name: 'High-Rise Wide Trouser',
		category: 'women',
		brand: 'Nordic Row',
		price: 124,
		rating: 4.7,
		reviews: 188,
		createdAt: '2024-12-08',
		popularity: 90,
		sizes: APPAREL_SIZES,
		colors: [C.black, C.camel, C.olive],
		tags: ['tailoring', 'workwear'],
		image: 'photo-1509631179647-0177331693ae',
		hoverImage: 'photo-1594633312681-425c7b97ccd1',
		description:
			'Fluid wide-leg trousers with a flattering high rise and pressed crease. Cut from a drapey twill blend.',
		goesWith: ['w-silk-cami', 'w-linen-blazer', 'shoes-mule']
	},
	{
		id: 'w-ribbed-knit',
		name: 'Merino Ribbed Sweater',
		category: 'women',
		brand: 'Loom & Co.',
		price: 98,
		rating: 4.9,
		reviews: 301,
		createdAt: '2025-02-01',
		popularity: 98,
		sizes: APPAREL_SIZES,
		colors: [C.cream, C.rust, C.grey],
		tags: ['knitwear', 'merino', 'new'],
		isNew: true,
		image: 'photo-1576566588028-4147f3842f27',
		hoverImage: 'photo-1434389677669-e08b4cac3105',
		description:
			'A fine-gauge ribbed sweater knit from extra-fine merino for warmth without bulk. Ribbed cuffs and hem.',
		goesWith: ['w-wide-trouser', 'shoes-boot']
	},
	{
		id: 'w-slip-dress',
		name: 'Satin Slip Dress',
		category: 'women',
		brand: 'Maison Cinq',
		price: 142,
		rating: 4.5,
		reviews: 97,
		createdAt: '2024-10-20',
		popularity: 74,
		sizes: APPAREL_SIZES,
		colors: [C.burgundy, C.black, C.stone],
		tags: ['evening', 'satin'],
		image: 'photo-1595777457583-95e059d581b8',
		hoverImage: 'photo-1490481651871-ab68de25d43d',
		description:
			'A midi slip dress in fluid satin with a cowl neck and delicate straps. Bias-cut for a liquid drape.',
		goesWith: ['w-linen-blazer', 'shoes-heel', 'acc-gold-hoops']
	},
	{
		id: 'w-denim-jacket',
		name: 'Cropped Denim Jacket',
		category: 'women',
		brand: 'Kestrel',
		price: 112,
		priceWas: 140,
		rating: 4.4,
		reviews: 156,
		createdAt: '2024-09-11',
		popularity: 68,
		sizes: APPAREL_SIZES,
		colors: [C.denim, C.white],
		tags: ['denim', 'casual'],
		image: 'photo-1601333144130-8cbb312386b6',
		hoverImage: 'photo-1516257984-b1b4d707412e',
		description:
			'A cropped trucker jacket in rigid organic denim with a classic point collar and chest pockets.',
		goesWith: ['w-slip-dress', 'shoes-sneaker']
	},
	{
		id: 'w-pleated-skirt',
		name: 'Pleated Midi Skirt',
		category: 'women',
		brand: 'Verano',
		price: 96,
		rating: 4.6,
		reviews: 88,
		createdAt: '2025-01-28',
		popularity: 71,
		sizes: APPAREL_SIZES,
		colors: [C.olive, C.black, C.sand],
		tags: ['skirt', 'new'],
		isNew: true,
		image: 'photo-1583744946564-b52ac1c389c8',
		hoverImage: 'photo-1594633312681-425c7b97ccd1',
		description:
			'An accordion-pleated midi skirt with an elasticated waist and a gentle swing with every step.',
		goesWith: ['w-ribbed-knit', 'shoes-boot']
	},
	{
		id: 'w-trench',
		name: 'Belted Cotton Trench',
		category: 'women',
		brand: 'Atelier',
		price: 224,
		rating: 4.9,
		reviews: 342,
		createdAt: '2024-08-30',
		popularity: 99,
		sizes: APPAREL_SIZES,
		colors: [C.camel, C.black],
		tags: ['outerwear', 'classic'],
		image: 'photo-1544022613-e87ca75a784a',
		hoverImage: 'photo-1490481651871-ab68de25d43d',
		description:
			'The definitive trench in water-resistant cotton gabardine with a storm flap, epaulettes and a tie belt.',
		goesWith: ['w-wide-trouser', 'acc-leather-tote', 'shoes-boot']
	},

	// ---------------- MEN ----------------
	{
		id: 'm-oxford-shirt',
		name: 'Oxford Cotton Shirt',
		category: 'men',
		brand: 'Nordic Row',
		price: 74,
		rating: 4.7,
		reviews: 264,
		createdAt: '2024-12-19',
		popularity: 92,
		sizes: APPAREL_SIZES,
		colors: [C.white, C.denim, C.stone],
		tags: ['shirt', 'essential'],
		image: 'photo-1602810318383-e386cc2a3ccf',
		hoverImage: 'photo-1596755094514-f87e34085b2c',
		description:
			'A button-down Oxford in mid-weight organic cotton with a slightly relaxed fit and a tonal chest pocket.',
		goesWith: ['m-chino', 'm-suede-loafer']
	},
	{
		id: 'm-merino-crew',
		name: 'Merino Crew Knit',
		category: 'men',
		brand: 'Loom & Co.',
		price: 105,
		rating: 4.8,
		reviews: 178,
		createdAt: '2025-01-05',
		popularity: 87,
		sizes: APPAREL_SIZES,
		colors: [C.navy, C.grey, C.rust],
		tags: ['knitwear', 'merino'],
		image: 'photo-1620012253295-c15cc3e65df4',
		hoverImage: 'photo-1638885930125-85350348d266',
		description:
			'A refined crew-neck sweater in extra-fine merino wool. Lightweight, breathable and layers cleanly under a coat.',
		goesWith: ['m-chino', 'm-wool-coat']
	},
	{
		id: 'm-chino',
		name: 'Tapered Cotton Chino',
		category: 'men',
		brand: 'Kestrel',
		price: 88,
		priceWas: 110,
		rating: 4.6,
		reviews: 205,
		createdAt: '2024-11-22',
		popularity: 84,
		sizes: APPAREL_SIZES,
		colors: [C.sand, C.navy, C.olive],
		tags: ['trouser', 'casual'],
		image: 'photo-1473966968600-fa801b869a1a',
		hoverImage: 'photo-1552374196-c4e7ffc6e126',
		description:
			'A modern tapered chino in stretch cotton twill with a clean flat front and slanted pockets.',
		goesWith: ['m-oxford-shirt', 'm-merino-crew', 'm-suede-loafer']
	},
	{
		id: 'm-wool-coat',
		name: 'Wool Overcoat',
		category: 'men',
		brand: 'Atelier',
		price: 268,
		rating: 4.9,
		reviews: 143,
		createdAt: '2024-10-02',
		popularity: 95,
		sizes: APPAREL_SIZES,
		colors: [C.charcoal, C.camel, C.navy],
		tags: ['outerwear', 'tailoring'],
		image: 'photo-1520975954732-35dd22299614',
		hoverImage: 'photo-1591047139829-d91aecb6caea',
		description:
			'A single-breasted overcoat in an Italian wool blend with a notch lapel and a clean, elongated line.',
		goesWith: ['m-merino-crew', 'm-chino', 'shoes-derby']
	},
	{
		id: 'm-tee',
		name: 'Heavyweight Cotton Tee',
		category: 'men',
		brand: 'Verano',
		price: 38,
		rating: 4.5,
		reviews: 421,
		createdAt: '2025-02-10',
		popularity: 89,
		sizes: APPAREL_SIZES,
		colors: [C.white, C.black, C.olive],
		tags: ['tee', 'essential', 'new'],
		isNew: true,
		image: 'photo-1521572163474-6864f9cf17ab',
		hoverImage: 'photo-1503342217505-b0a15ec3261c',
		description:
			'A boxy heavyweight tee in 240gsm combed cotton that holds its shape wash after wash.',
		goesWith: ['m-chino', 'shoes-sneaker']
	},
	{
		id: 'm-denim',
		name: 'Straight Selvedge Jean',
		category: 'men',
		brand: 'Kestrel',
		price: 128,
		rating: 4.7,
		reviews: 199,
		createdAt: '2024-12-01',
		popularity: 83,
		sizes: APPAREL_SIZES,
		colors: [C.denim, C.black],
		tags: ['denim'],
		image: 'photo-1542272604-787c3835535d',
		hoverImage: 'photo-1475178626620-a4d074967452',
		description:
			'A mid-rise straight jean in 13.5oz Japanese selvedge denim with a button fly and copper rivets.',
		goesWith: ['m-oxford-shirt', 'm-tee', 'shoes-sneaker']
	},
	{
		id: 'm-overshirt',
		name: 'Brushed Flannel Overshirt',
		category: 'men',
		brand: 'Nordic Row',
		price: 96,
		priceWas: 124,
		rating: 4.6,
		reviews: 112,
		createdAt: '2024-09-25',
		popularity: 72,
		sizes: APPAREL_SIZES,
		colors: [C.olive, C.burgundy, C.navy],
		tags: ['shirt', 'layering'],
		image: 'photo-1618517351616-38fb9c5210c6',
		hoverImage: 'photo-1596755094514-f87e34085b2c',
		description:
			'A shirt-jacket hybrid in brushed cotton flannel with a double chest pocket and corozo buttons.',
		goesWith: ['m-tee', 'm-denim', 'shoes-derby']
	},

	// ---------------- SHOES ----------------
	{
		id: 'shoes-sneaker',
		name: 'Retro Court Sneaker',
		category: 'shoes',
		brand: 'Verano',
		price: 118,
		rating: 4.7,
		reviews: 356,
		createdAt: '2025-01-18',
		popularity: 94,
		sizes: SHOE_SIZES,
		colors: [C.white, C.cream],
		tags: ['sneaker', 'casual'],
		image: 'photo-1595950653106-6c9ebd614d3a',
		hoverImage: 'photo-1600185365483-26d7a4cc7519',
		description:
			'A low-profile court sneaker in tumbled leather with a vintage gum sole and tonal stitching.',
		goesWith: ['m-denim', 'm-tee', 'w-denim-jacket']
	},
	{
		id: 'shoes-boot',
		name: 'Chelsea Leather Boot',
		category: 'shoes',
		brand: 'Atelier',
		price: 196,
		rating: 4.8,
		reviews: 187,
		createdAt: '2024-11-14',
		popularity: 88,
		sizes: SHOE_SIZES,
		colors: [C.black, C.camel],
		tags: ['boot', 'leather'],
		image: 'photo-1608667508764-33cf0726b13a',
		hoverImage: 'photo-1638247025967-b4e38f787b76',
		description:
			'A classic Chelsea boot in full-grain leather with elastic side gussets and a stacked heel.',
		goesWith: ['w-pleated-skirt', 'w-ribbed-knit', 'm-chino']
	},
	{
		id: 'shoes-heel',
		name: 'Leather Point Heel',
		category: 'shoes',
		brand: 'Maison Cinq',
		price: 158,
		priceWas: 198,
		rating: 4.4,
		reviews: 76,
		createdAt: '2024-10-08',
		popularity: 66,
		sizes: SHOE_SIZES,
		colors: [C.black, C.burgundy],
		tags: ['heel', 'evening'],
		image: 'photo-1543163521-1bf539c55dd2',
		hoverImage: 'photo-1596703263926-eb0762ee17e4',
		description:
			'A pointed-toe pump in soft nappa leather with a slender 65mm heel and a padded footbed.',
		goesWith: ['w-slip-dress', 'w-wide-trouser']
	},
	{
		id: 'shoes-loafer',
		name: 'Suede Penny Loafer',
		category: 'shoes',
		brand: 'Nordic Row',
		price: 142,
		rating: 4.6,
		reviews: 121,
		createdAt: '2024-12-27',
		popularity: 79,
		sizes: SHOE_SIZES,
		colors: [C.camel, C.navy],
		tags: ['loafer'],
		image: 'photo-1614252369475-531eba835eb1',
		hoverImage: 'photo-1582897085656-c636d006a246',
		description:
			'A penny loafer in brushed suede with a hand-stitched apron and a lightweight flexible sole.',
		goesWith: ['m-chino', 'm-oxford-shirt']
	},
	{
		id: 'shoes-mule',
		name: 'Square-Toe Mule',
		category: 'shoes',
		brand: 'Verano',
		price: 128,
		rating: 4.3,
		reviews: 54,
		createdAt: '2025-02-04',
		popularity: 63,
		sizes: SHOE_SIZES,
		colors: [C.stone, C.black],
		tags: ['mule', 'new'],
		isNew: true,
		image: 'photo-1596703263926-eb0762ee17e4',
		hoverImage: 'photo-1543163521-1bf539c55dd2',
		description:
			'A minimalist square-toe mule in smooth leather with a low block heel for all-day ease.',
		goesWith: ['w-wide-trouser', 'w-pleated-skirt']
	},
	{
		id: 'shoes-derby',
		name: 'Leather Derby Shoe',
		category: 'shoes',
		brand: 'Atelier',
		price: 178,
		rating: 4.7,
		reviews: 98,
		createdAt: '2024-09-19',
		popularity: 70,
		sizes: SHOE_SIZES,
		colors: [C.black, C.camel],
		tags: ['derby', 'formal'],
		image: 'photo-1582897085656-c636d006a246',
		hoverImage: 'photo-1614252369475-531eba835eb1',
		description:
			'A Goodyear-welted derby in polished calf leather with an open lacing and a leather sole.',
		goesWith: ['m-wool-coat', 'm-overshirt']
	},

	// ---------------- ACCESSORIES ----------------
	{
		id: 'acc-leather-tote',
		name: 'Structured Leather Tote',
		category: 'accessories',
		brand: 'Maison Cinq',
		price: 214,
		rating: 4.8,
		reviews: 167,
		createdAt: '2024-11-30',
		popularity: 91,
		sizes: ONE_SIZE,
		colors: [C.camel, C.black],
		tags: ['bag', 'leather'],
		image: 'photo-1584917865442-de89df76afd3',
		hoverImage: 'photo-1548036328-c9fa89d128fa',
		description:
			'A roomy structured tote in vegetable-tanned leather with an internal zip pocket and rolled handles.',
		goesWith: ['w-trench', 'w-linen-blazer']
	},
	{
		id: 'acc-gold-hoops',
		name: 'Gold Vermeil Hoops',
		category: 'accessories',
		brand: 'Atelier',
		price: 64,
		rating: 4.6,
		reviews: 233,
		createdAt: '2025-01-22',
		popularity: 82,
		sizes: ONE_SIZE,
		colors: [{ name: 'Gold', hex: '#c9a24b' }],
		tags: ['jewellery', 'new'],
		isNew: true,
		image: 'photo-1611652022419-a9419f74343d',
		hoverImage: 'photo-1535632066927-ab7c9ab60908',
		description:
			'Everyday hoop earrings in 18k gold vermeil over recycled sterling silver. Lightweight and hypoallergenic.',
		goesWith: ['w-slip-dress']
	},
	{
		id: 'acc-wool-scarf',
		name: 'Lambswool Scarf',
		category: 'accessories',
		brand: 'Loom & Co.',
		price: 58,
		priceWas: 72,
		rating: 4.7,
		reviews: 141,
		createdAt: '2024-10-16',
		popularity: 75,
		sizes: ONE_SIZE,
		colors: [C.camel, C.grey, C.burgundy],
		tags: ['scarf', 'winter'],
		image: 'photo-1520903920243-00d872a2d1c9',
		hoverImage: 'photo-1601924994987-69e26d50dc26',
		description:
			'A generously sized scarf woven from brushed lambswool with fringed ends. Warm without the weight.',
		goesWith: ['m-wool-coat', 'w-trench']
	},
	{
		id: 'acc-leather-belt',
		name: 'Italian Leather Belt',
		category: 'accessories',
		brand: 'Kestrel',
		price: 72,
		rating: 4.5,
		reviews: 89,
		createdAt: '2024-12-12',
		popularity: 64,
		sizes: ONE_SIZE,
		colors: [C.black, C.camel],
		tags: ['belt', 'leather'],
		image: 'photo-1624222247344-550fb60583dc',
		hoverImage: 'photo-1553062407-98eeb64c6a62',
		description:
			'A 35mm belt in full-grain Italian leather with a brushed nickel buckle and hand-painted edges.',
		goesWith: ['m-chino', 'm-denim']
	},
	{
		id: 'acc-sunglasses',
		name: 'Acetate Sunglasses',
		category: 'accessories',
		brand: 'Verano',
		price: 96,
		rating: 4.4,
		reviews: 112,
		createdAt: '2025-02-06',
		popularity: 78,
		sizes: ONE_SIZE,
		colors: [C.black, { name: 'Tortoise', hex: '#6b4a2b' }],
		tags: ['eyewear', 'new'],
		isNew: true,
		image: 'photo-1511499767150-a48a237f0083',
		hoverImage: 'photo-1508296695146-257a814070b4',
		description:
			'A rounded silhouette in hand-polished acetate with polarised, UV400 lenses and a keyhole bridge.',
		goesWith: ['w-linen-blazer', 'm-tee']
	},
	{
		id: 'acc-cap',
		name: 'Washed Cotton Cap',
		category: 'accessories',
		brand: 'Nordic Row',
		price: 34,
		rating: 4.3,
		reviews: 174,
		createdAt: '2024-09-08',
		popularity: 60,
		sizes: ONE_SIZE,
		colors: [C.olive, C.sand, C.navy],
		tags: ['hat', 'casual'],
		image: 'photo-1588850561407-ed78c282e89b',
		hoverImage: 'photo-1521369909029-2afed882baee',
		description:
			'A six-panel cap in garment-washed cotton twill with an adjustable metal clasp and a curved brim.',
		goesWith: ['m-tee', 'shoes-sneaker']
	}
]

// Normalise: attach resolved image URLs and a stable, computed sale percentage.
export const PRODUCTS = RAW.map(p => ({
	...p,
	isNew: Boolean(p.isNew),
	onSale: Boolean(p.priceWas),
	discountPct: p.priceWas
		? Math.round(((p.priceWas - p.price) / p.priceWas) * 100)
		: 0,
	imageUrl: img(p.image, 800),
	imageUrlSmall: img(p.image, 500),
	hoverImageUrl: img(p.hoverImage, 800),
	categoryTitle: CATEGORIES.find(c => c.id === p.category)?.title ?? p.category
}))

export const getProductById = id => PRODUCTS.find(p => p.id === id)

export const getRelated = (product, limit = 4) =>
	PRODUCTS.filter(
		p => p.category === product.category && p.id !== product.id
	).slice(0, limit)

export const getCompleteTheLook = product =>
	(product.goesWith ?? []).map(id => getProductById(id)).filter(Boolean)

// Price bounds for the range filter
export const PRICE_BOUNDS = {
	min: Math.min(...PRODUCTS.map(p => p.price)),
	max: Math.max(...PRODUCTS.map(p => p.price))
}

export const SORT_OPTIONS = [
	{ value: 'popular', label: 'Most popular' },
	{ value: 'newest', label: 'Newest' },
	{ value: 'price-asc', label: 'Price: low to high' },
	{ value: 'price-desc', label: 'Price: high to low' },
	{ value: 'rating', label: 'Top rated' }
]
