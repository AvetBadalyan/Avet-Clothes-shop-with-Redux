import Icon from '@/components/common/Icon.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import './SizeGuideModal.scss'

// Reference measurement tables. Values are illustrative for a demo store.
const APPAREL_TABLE = {
	head: ['Size', 'Chest (in)', 'Waist (in)', 'Hip (in)'],
	rows: [
		['XS', '32–34', '25–27', '35–37'],
		['S', '35–37', '28–30', '38–40'],
		['M', '38–40', '31–33', '41–43'],
		['L', '41–43', '34–36', '44–46'],
		['XL', '44–46', '37–40', '47–49']
	]
}

const SHOE_TABLE = {
	head: ['EU', 'UK', 'US', 'Foot length (cm)'],
	rows: [
		['38', '5', '6', '24.1'],
		['39', '6', '7', '24.8'],
		['40', '6.5', '7.5', '25.4'],
		['41', '7.5', '8.5', '26.0'],
		['42', '8', '9', '26.7'],
		['43', '9', '10', '27.3'],
		['44', '9.5', '10.5', '27.9']
	]
}

export default function SizeGuideModal({ open, onClose, category }) {
	const panelRef = useRef(null)
	useFocusTrap(panelRef, open)

	// Close on Escape and lock body scroll while open.
	useEffect(() => {
		if (!open) return
		const onKey = e => e.key === 'Escape' && onClose()
		window.addEventListener('keydown', onKey)
		document.body.style.overflow = 'hidden'
		return () => {
			window.removeEventListener('keydown', onKey)
			document.body.style.overflow = ''
		}
	}, [open, onClose])

	const isShoes = category === 'shoes'
	const table = isShoes ? SHOE_TABLE : APPAREL_TABLE

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="sizeguide"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className="sizeguide__panel"
						ref={panelRef}
						role="dialog"
						aria-modal="true"
						aria-label="Size guide"
						initial={{ y: 24, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 24, opacity: 0 }}
						transition={{ type: 'spring', damping: 28, stiffness: 300 }}
						onClick={e => e.stopPropagation()}
					>
						<div className="sizeguide__head">
							<div>
								<p className="overline">Fit &amp; sizing</p>
								<h2>{isShoes ? 'Shoe size guide' : 'Size guide'}</h2>
							</div>
							<button
								className="sizeguide__close"
								onClick={onClose}
								aria-label="Close size guide"
							>
								<Icon name="close" />
							</button>
						</div>

						<div className="sizeguide__table-wrap">
							<table className="sizeguide__table">
								<thead>
									<tr>
										{table.head.map(h => (
											<th key={h}>{h}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{table.rows.map(row => (
										<tr key={row[0]}>
											{row.map((cell, i) => (
												<td
													key={i}
													data-label={table.head[i]}
												>
													{cell}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<p className="sizeguide__note">
							{isShoes
								? 'Measure your foot from heel to longest toe. If you fall between sizes, we recommend sizing up.'
								: 'Measurements are body measurements, not garment dimensions. If you fall between sizes, size up for a relaxed fit.'}
						</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
