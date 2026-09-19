// ============================================================
//  Recently viewed service.
//
//  Tracks the most recently viewed product ids in localStorage so we can
//  show a "Recently viewed" row and help shoppers pick up where they left
//  off. Kept as a small abstraction (like authService / orderService) so it
//  could later be backed by an API without touching the UI.
// ============================================================
import { loadState, saveState } from '@/store/storage.js'

const KEY = 'recentlyViewed'
const MAX = 8

export const recentlyViewedService = {
  /** Ordered list of recently viewed product ids (newest first). */
  list() {
    return loadState(KEY, [])
  },

  /** Record a view: move the id to the front, de-duplicated, capped at MAX. */
  add(id) {
    if (!id) return
    const existing = loadState(KEY, []).filter((x) => x !== id)
    const next = [id, ...existing].slice(0, MAX)
    saveState(KEY, next)
    return next
  }
}
