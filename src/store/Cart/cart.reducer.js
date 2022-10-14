import { CART_ACTION_TYPES } from "./cart.actions";

export const CART_INITIAL_STATE = {
  cartItems: []
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const existingCartItem = state.cartItems?.find(
        (cartItem) => cartItem.id === payload.id
      );

      if (existingCartItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === payload.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...payload, quantity: 1 }],
      };
    }

    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART: {
      const existingCartItem = state.cartItems?.find(
        (cartItem) => cartItem.id === payload
      );

      if (existingCartItem.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (cartItem) => cartItem.id !== payload
          ),
        };
      }

      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          if (cartItem.id === payload) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        }),
      };
    }

    case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== payload
        ),
      };

    case CART_ACTION_TYPES.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
