import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  CHECKOUT_START,
  CHECKOUT_SUCCESS,
  CLEAR_CURRENT_CART,
  DELETE_SAVED_ADDRESS,
  DELETE_SAVED_CARD,
  GET_REFRESHED_USER_INFO,
  REFRESH_ADDRESS_FROM_SERVER,
  REFRESH_CARDS_FROM_SERVER,
  SAVE_CREDIT_CARD,
  SAVE_CREDIT_CART_OPTIONS,
  SAVE_DELIVERY,
  SAVE_DELIVERY_ADDRESS,
  SAVE_DELIVERY_OPTIONS,
  SET_ACCOUNT_ACTIVE_TAB,
  SET_CURRENT_CREDIT_CARD,
  SET_DELIVERY_MANUALLY,
  SET_DELIVERY_METHOD,
  SET_LOGIN_ACTIVE_TAB,
  SHOW_ALL_ORDERS,
  TOGGLE_ADDRESS_MODAL,
  TOGGLE_WISHLIST,
} from "../actions/actionTypes";

const initialState = {
  userId: {},
  deliveryMethod: "myself",
  deliveryAddress: null,
  currentCard: {
    cardNumber: null,
    cardName: null,
    cardExp: null,
    cardExp2: null,
    cardCvv: null,
  },
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
  isModalActive: false,
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
  // TODO add more fields to update
  [GET_REFRESHED_USER_INFO]: (state, { user }) => ({
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
  [SAVE_DELIVERY]: (state, { savedDeliveryAddresses }) => ({
    ...state,
    savedDeliveryAddresses,
  }),
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
    currentCard: {
      cardNumber: null,
      cardName: null,
      cardExp: null,
      cardExp2: null,
      cardCvv: null,
    },
  }),
  [CLEAR_CURRENT_CART]: (state) => ({
    ...state,
    currentCard: {
      cardNumber: null,
      cardName: null,
      cardExp: null,
      cardExp2: null,
      cardCvv: null,
    },
  }),
  [SET_CURRENT_CREDIT_CARD]: (state, { currentCard }) => ({
    ...state,
    currentCard,
  }),
  [SHOW_ALL_ORDERS]: (state, { orders }) => ({
    ...state,
    orders,
  }),
  [SET_DELIVERY_MANUALLY]: (state, { deliveryMethod, deliveryAddress }) => ({
    ...state,
    deliveryMethod,
    deliveryAddress,
  }),
  [DELETE_SAVED_ADDRESS]: (state, { savedDeliveryMethods }) => ({
    ...state,
    savedDeliveryAddresses: savedDeliveryMethods,
    userId: {
      ...state.userId,
      savedDeliveryMethods,
    },
  }),
  [DELETE_SAVED_CARD]: (state, { creditCards }) => ({
    ...state,
    savedCards: creditCards,
    userId: {
      ...state.userId,
      creditCards,
    },
  }),
  [TOGGLE_WISHLIST]: (state, { wishlist }) => ({
    ...state,
    userId: {
      ...state.userId,
      wishlist,
    },
  }),
  [TOGGLE_ADDRESS_MODAL]: (state, { isModalActive }) => ({
    ...state,
    isModalActive,
  }),
  [REFRESH_ADDRESS_FROM_SERVER]: (state, { savedDeliveryMethods }) => ({
    ...state,
    userId: {
      ...state.userId,
      savedDeliveryMethods,
    },
    savedDeliveryAddresses: savedDeliveryMethods,
  }),
  [REFRESH_CARDS_FROM_SERVER]: (state, { creditCards }) => ({
    ...state,
    userId: {
      ...state.userId,
      creditCards,
    },
    savedCards: creditCards,
  }),
  DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
export default userReducer;
