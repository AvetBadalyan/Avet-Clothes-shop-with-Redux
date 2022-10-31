import { USER_ACTION_TYPES } from "./user.action";

const USER_INITIAL_STATE = {
  currentUser: null,
  token: "",
  isOrderBoxVisible: false,
  formInputsValidity: {
    name: true,
    street: true,
    city: true,
    postalCode: true,
  },
  isOrderSubmitted: false,
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    case USER_ACTION_TYPES.SET_TOKEN:
      return { ...state, token: payload };

    case USER_ACTION_TYPES.SET_ORDER_BOX_VISIBLE:
      return { ...state, isOrderBoxVisible: payload };

    case USER_ACTION_TYPES.SET_FORM_INPUTS_VALIDITY:
      return { ...state, formInputsValidity: payload };

    case USER_ACTION_TYPES.SET_ORDER_SUBMITTED:
      return { ...state, isOrderSubmitted: payload };
    default:
      return state;
  }
};
