import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  SAVE_CREDIT_CARD_DETAILS,
} from "../actions/actionTypes";

const initialState = {
  userId: {},
  isCardSaved: false,
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
  DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
export default userReducer;
