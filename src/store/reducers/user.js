import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  SAVE_CREDIT_CARD_DETAILS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_LOGIN_ACTIVE_TAB,
} from "../actions/actionTypes";

const initialState = {
  userId: {},
  isCardSaved: false,
  accountActiveTab: "profile",
  loginActiveTab: true,
  loading: false,
  error: false,
};

const handlers = {
  [AUTH_SUCCESS]: (state, { user }) => ({ ...state, userId: user }),
  [AUTH_LOGOUT]: (state) => ({ ...state, userId: null }),
  [SAVE_CREDIT_CARD_DETAILS]: (state, { isCardSaved }) => ({
    ...state,
    isCardSaved,
  }),
  [SET_ACCOUNT_ACTIVE_TAB]: (state, { accountActiveTab }) => ({
    ...state,
    accountActiveTab,
  }),
  [SET_LOGIN_ACTIVE_TAB]: (state, { loginActiveTab }) => ({
    ...state,
    loginActiveTab,
  }),
  DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
export default userReducer;
