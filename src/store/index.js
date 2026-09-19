import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import cartReducer from './cartSlice.js'
import filtersReducer from './filtersSlice.js'
import { saveState } from './storage.js'
import uiReducer from './uiSlice.js'
import wishlistReducer from './wishlistSlice.js'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    filters: filtersReducer,
    auth: authReducer,
    ui: uiReducer
  }
})

// Persist a few slices to localStorage whenever they change.
//
// Redux Toolkit returns a brand-new array reference only when the data
// actually changes, so comparing the current value to the previous one with
// `!==` tells us whether we need to write. This avoids saving on every
// unrelated dispatch (e.g. opening the cart drawer).
const persist = (key, getValue) => {
  let previous = getValue(store.getState())
  return () => {
    const current = getValue(store.getState())
    if (current !== previous) {
      previous = current
      saveState(key, current)
    }
  }
}

const persisters = [
  persist('cart', (state) => state.cart.items),
  persist('wishlist', (state) => state.wishlist.ids),
  persist('theme', (state) => state.ui.theme)
]

store.subscribe(() => persisters.forEach((run) => run()))
