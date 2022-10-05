import { createAction } from "../../helpers/reducer/reducer.helper";

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_TOKEN: "SET_TOKEN",
};

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
