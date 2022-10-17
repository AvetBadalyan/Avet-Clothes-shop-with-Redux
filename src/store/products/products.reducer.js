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
          ...Object.keys(state.products).map((product) => {
            return state.products[product]
              .filter((item) => {
                return item.name
                  .toLowerCase()
                  .includes(action.payload.toLowerCase());
              })
              .flat();
          }),
        ],
      };
    default:
      return state;
  }
};
