export const PRODUCTS_INITIAL_STATE = {
  products: [],
};

export const PRODUCTS_ACTION_TYPES = {
  SET_PRODUCTS: "SET_PRODUCTS",
};

export const productsReducer = (state = PRODUCTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
      return { ...state, products: action.payload };

    default:
      return state;
  }
};
