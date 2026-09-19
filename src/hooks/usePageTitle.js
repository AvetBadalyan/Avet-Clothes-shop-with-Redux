import { useEffect } from 'react'

const BASE = 'MODERN'

/**
 * Sets document.title to "<title> | MODERN" on mount and resets on unmount.
 * @param {string} title  - Page-specific title segment, e.g. "Shop"
 */
export function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title ? `${title} · ${BASE}` : BASE
    return () => {
      document.title = prev
    }
  }, [title])
}
