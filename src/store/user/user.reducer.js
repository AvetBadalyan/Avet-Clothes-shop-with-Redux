import { USER_ACTION_TYPES } from "./user.action";

const INITIAL_STATE = {
  currentUser: null,
  token: ""
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SET_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
