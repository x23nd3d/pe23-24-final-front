import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  SAVE_CREDIT_CARD,
  SAVE_CREDIT_CART_OPTIONS,
  SAVE_DELIVERY,
  SAVE_DELIVERY_ADDRESS,
  SAVE_DELIVERY_OPTIONS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_DELIVERY_METHOD,
  SET_LOGIN_ACTIVE_TAB,
  SHOW_ALL_ORDERS,
} from "../actions/actionTypes";

const initialState = {
  userId: {},
  deliveryMethod: "myself",
  deliveryAddress: null,
  isCardSaved: false,
  savedCards: [],
  orders: [],
  savedDeliveryAddresses: [],
  savedAddressesLimit: 3,
  savedCardsLimit: 3,
  temp: null,
  isDeliverySaved: false,
  accountActiveTab: "profile",
  loginActiveTab: true,
  loading: false,
  error: false,
};

const handlers = {
  [AUTH_SUCCESS]: (state, { user }) => ({
    ...state,
    userId: user,
    savedCards: user.creditCards,
    savedDeliveryAddresses: user.savedDeliveryMethods,
  }),
  [AUTH_LOGOUT]: (state) => ({ ...state, userId: null }),
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
    isDeliverySaved: false,
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
  [SAVE_CREDIT_CARD]: (state, { savedCards }) => ({
    ...state,
    savedCards,
  }),
  [SAVE_DELIVERY]: (state, { savedDeliveryAddresses }) => {
    console.log(
      "savedDeliveryAddressessavedDeliveryAddresses",
      savedDeliveryAddresses
    );
    return {
      ...state,
      savedDeliveryAddresses,
    };
  },
  [CHECKOUT_START]: (state) => ({
    ...state,
    loading: true,
  }),
  [CHECKOUT_SUCCESS]: (state) => ({
    ...state,
    deliveryMethod: "myself",
    deliveryAddress: null,
    isCardSaved: false,
    temp: null,
    isDeliverySaved: false,
    accountActiveTab: "history",
    loading: false,
    error: false,
  }),
  [SHOW_ALL_ORDERS]: (state, { orders }) => ({
    ...state,
    orders,
  }),
  DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
export default userReducer;
