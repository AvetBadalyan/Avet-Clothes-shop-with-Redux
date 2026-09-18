import { createSlice, nanoid } from '@reduxjs/toolkit'
import { loadState, saveState } from './storage.js'

// Detect user's system preference
const getSystemTheme = () => {
	if (typeof window === 'undefined') return 'light'
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

// Load saved theme or use system preference
const getInitialTheme = () => {
	const saved = loadState('theme', null)
	if (saved === 'light' || saved === 'dark') return saved
	return getSystemTheme()
}

const initialState = {
	cartOpen: false,
	filtersOpen: false, // mobile filter drawer
	quickViewId: null, // product id shown in quick-view modal
	toasts: [], // { id, message, type }
	theme: getInitialTheme() // "light" | "dark"
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openCart(state) {
			state.cartOpen = true
		},
		closeCart(state) {
			state.cartOpen = false
		},
		toggleFilters(state) {
			state.filtersOpen = !state.filtersOpen
		},
		closeFilters(state) {
			state.filtersOpen = false
		},
		openQuickView(state, action) {
			state.quickViewId = action.payload
		},
		closeQuickView(state) {
			state.quickViewId = null
		},
		addToast: {
			reducer(state, action) {
				state.toasts.push(action.payload)
			},
			prepare(message, type = 'success') {
				return { payload: { id: nanoid(), message, type } }
			}
		},
		dismissToast(state, action) {
			state.toasts = state.toasts.filter(t => t.id !== action.payload)
		},
		setTheme(state, action) {
			state.theme = action.payload
			saveState('theme', action.payload)
			document.documentElement.setAttribute('data-theme', action.payload)
		},
		toggleTheme(state) {
			const newTheme = state.theme === 'light' ? 'dark' : 'light'
			state.theme = newTheme
			saveState('theme', newTheme)
			document.documentElement.setAttribute('data-theme', newTheme)
		}
	}
})

export const {
	openCart,
	closeCart,
	toggleFilters,
	closeFilters,
	openQuickView,
	closeQuickView,
	addToast,
	dismissToast,
	setTheme,
	toggleTheme
} = uiSlice.actions

export default uiSlice.reducer

export const selectCartOpen = state => state.ui.cartOpen
export const selectFiltersOpen = state => state.ui.filtersOpen
export const selectQuickViewId = state => state.ui.quickViewId
export const selectToasts = state => state.ui.toasts
export const selectTheme = state => state.ui.theme
