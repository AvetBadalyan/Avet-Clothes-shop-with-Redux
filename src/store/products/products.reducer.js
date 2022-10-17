import { PRODUCTS_ACTION_TYPES } from "./products.actions";

export const PRODUCTS_INITIAL_STATE = {
  products: {},
  filtered: [],
};

export const productsReducer = (state = PRODUCTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCTS_ACTION_TYPES.SET_PRODUCTS:
      return { ...state, products: action.payload };

    case PRODUCTS_ACTION_TYPES.FILTER:
      if (!action.payload) {
        return {
          ...state,
          filtered: [],
        };
      }
      return {
        ...state,
        filtered: [
          ...state.products?.map((product) => {
            return product.items?.filter((item) => {
              return item.name.includes(action.payload);
            });
          }),
        ],
      };
    default:
      return state;
  }
};
