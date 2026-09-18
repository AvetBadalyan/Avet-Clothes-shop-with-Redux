import { useEffect, useRef } from 'react'

// All focusable element selectors (ARIA-compliant)
const FOCUSABLE =
	'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Traps keyboard focus inside the given ref element while active.
 * Meets WCAG 2.1 SC 2.1.2 — on mount it moves focus to the first
 * focusable child, and Tab/Shift+Tab cycle within the container.
 *
 * @param {React.RefObject} containerRef - ref attached to the modal panel
 * @param {boolean} active - whether the trap should be engaged
 */
export function useFocusTrap(containerRef, active) {
	// Remember what had focus before the modal opened so we can restore it.
	const previousFocusRef = useRef(null)

	useEffect(() => {
		if (!active) return

		// Save the element that was focused before the modal opened.
		previousFocusRef.current = document.activeElement

		const container = containerRef.current
		if (!container) return

		// Move focus to the first focusable element in the modal.
		const focusableEls = Array.from(container.querySelectorAll(FOCUSABLE))
		if (focusableEls.length) focusableEls[0].focus()

		const handleKeyDown = e => {
			if (e.key !== 'Tab') return

			const focusable = Array.from(container.querySelectorAll(FOCUSABLE))
			if (!focusable.length) {
				e.preventDefault()
				return
			}

			const first = focusable[0]
			const last = focusable[focusable.length - 1]

			if (e.shiftKey) {
				// Shift+Tab: if focus is on first element, wrap to last
				if (document.activeElement === first) {
					e.preventDefault()
					last.focus()
				}
			} else {
				// Tab: if focus is on last element, wrap to first
				if (document.activeElement === last) {
					e.preventDefault()
					first.focus()
				}
			}
		}

		container.addEventListener('keydown', handleKeyDown)

		return () => {
			container.removeEventListener('keydown', handleKeyDown)
			// Restore focus to the element that triggered the modal.
			previousFocusRef.current?.focus?.()
		}
	}, [active, containerRef])
}
