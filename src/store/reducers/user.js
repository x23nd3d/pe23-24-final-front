import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  SAVE_CREDIT_CARD,
  SAVE_CREDIT_CARD_DETAILS,
  SAVE_CREDIT_CART_OPTIONS,
  SAVE_DELIVERY_ADDRESS,
  SAVE_DELIVERY_OPTIONS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_DELIVERY_METHOD,
  SET_LOGIN_ACTIVE_TAB,
} from "../actions/actionTypes";

const initialState = {
  userId: {},
  deliveryMethod: "myself",
  deliveryAddress: null,
  isCardSaved: false,
  savedCards: [],
  isDeliverySaved: false,
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
  [SET_DELIVERY_METHOD]: (state, { deliveryMethod }) => ({
    ...state,
    deliveryMethod,
  }),
  [SAVE_DELIVERY_ADDRESS]: (state, { deliveryAddress }) => ({
    ...state,
    deliveryAddress,
  }),
  [SAVE_DELIVERY_OPTIONS]: (
    state,
    { deliveryMethod, deliveryAddress, isDeliverySaved }
  ) => ({
    ...state,
    deliveryMethod,
    deliveryAddress,
    isDeliverySaved,
  }),
  [SAVE_CREDIT_CART_OPTIONS]: (state, { isCardSaved }) => ({
    ...state,
    isCardSaved,
  }),
  [SAVE_CREDIT_CARD]: (state, { card }) => ({
    ...state,
    savedCards: state.savedCards.push(card),
  }),
  DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
export default userReducer;
