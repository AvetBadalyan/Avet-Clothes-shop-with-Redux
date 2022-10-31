import { createAction } from "../../helpers/reducer/reducer.helper";

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_TOKEN: "SET_TOKEN",
  SET_ORDER_BOX_VISIBLE: "SET_ORDER_BOX_VISIBLE",
  SET_FORM_INPUTS_VALIDITY: "SET_FORM_INPUTS_VALIDITY",
  SET_ORDER_SUBMITTED: "SET_ORDER_SUBMITTED",
};

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
