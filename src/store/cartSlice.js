import { createSlice } from '@reduxjs/toolkit'
import { loadState } from './storage.js'

// A cart line is unique per (product id + size + color).
const lineKey = (id, size, color) => `${id}::${size}::${color}`

const initialState = {
  items: loadState('cart', [])
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action) {
        const { id, size, color } = action.payload
        const key = lineKey(id, size, color)
        const existing = state.items.find((i) => i.key === key)
        if (existing) {
          existing.quantity += action.payload.quantity
        } else {
          state.items.push({ key, ...action.payload })
        }
      },
      // prepare lets callers pass a product + selected size/color/qty.
      prepare({ product, size, color, quantity = 1 }) {
        return {
          payload: {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            brand: product.brand,
            category: product.category,
            size,
            color,
            quantity
          }
        }
      }
    },
    incrementLine(state, action) {
      const line = state.items.find((i) => i.key === action.payload)
      if (line) line.quantity += 1
    },
    decrementLine(state, action) {
      const line = state.items.find((i) => i.key === action.payload)
      if (!line) return
      line.quantity -= 1
      if (line.quantity <= 0) {
        state.items = state.items.filter((i) => i.key !== action.payload)
      }
    },
    removeLine(state, action) {
      state.items = state.items.filter((i) => i.key !== action.payload)
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const {
  addToCart,
  incrementLine,
  decrementLine,
  removeLine,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer

// --- Selectors -------------------------------------------------------------
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
