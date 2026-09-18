import { createSelector, createSlice } from '@reduxjs/toolkit'
import { loadState } from './storage.js'

const initialState = {
	ids: loadState('wishlist', [])
}

const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		toggleWishlist(state, action) {
			const id = action.payload
			if (state.ids.includes(id)) {
				state.ids = state.ids.filter(x => x !== id)
			} else {
				state.ids.push(id)
			}
		},
		removeFromWishlist(state, action) {
			state.ids = state.ids.filter(x => x !== action.payload)
		},
		clearWishlist(state) {
			state.ids = []
		}
	}
})

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
	wishlistSlice.actions

export default wishlistSlice.reducer

export const selectWishlistIds = state => state.wishlist.ids
export const selectWishlistCount = state => state.wishlist.ids.length

/**
 * Memoized per-id selector factory. Returns a stable selector function
 * for each id so useAppSelector can bail out when ids haven't changed.
 * Usage: const wished = useAppSelector(selectIsWished(product.id))
 */
export const selectIsWished = id =>
	createSelector(selectWishlistIds, ids => ids.includes(id))
