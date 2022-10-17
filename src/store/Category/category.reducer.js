import { SINGLE_CATEGORY_ACTION_TYPES } from "./category.actions";

export const SINGLE_CATEGORY_INITIAL_STATE = {
  products: [],
  filtered: [],
};

export const singleCategoryReducer = (
  state = SINGLE_CATEGORY_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case SINGLE_CATEGORY_ACTION_TYPES.SET_CATEGORY:
      return { ...state, products: action.payload };

    case SINGLE_CATEGORY_ACTION_TYPES.FILTER:
      if (!action.payload) {
        return {
          ...state,
          filtered: [],
        };
      }
      return {
        ...state,
        filtered: [],
      };
    default:
      return state;
  }
};
