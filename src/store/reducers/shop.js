import {
  RECEIVE_CURRENT_ROUTE_ERROR,
  RECEIVE_CURRENT_ROUTE_START,
  RECEIVE_CURRENT_ROUTE_SUCCESS,
  RESET_FILTER_ITEMS,
  SEND_PRODUCTS_REQUEST_ERROR,
  SEND_PRODUCTS_REQUEST_START,
  SEND_PRODUCTS_REQUEST_SUCCESS,
  SET_FILTER_ITEMS,
  SHOP_SET_DEFAULT,
} from "../actions/actionTypes";

const initialState = {
  currentItems: [],
  currentRoute: "/shop/?category=all&type=all",
  loading: false,
  error: false,
  filteredItems: [],
};

const handlers = {
  [RECEIVE_CURRENT_ROUTE_START]: (state) => ({ ...state, loading: true }),
  [RECEIVE_CURRENT_ROUTE_SUCCESS]: (state, { route }) => ({
    ...state,
    loading: false,
    currentRoute: route,
  }),
  [RECEIVE_CURRENT_ROUTE_ERROR]: (state, { e }) => ({
    ...state,
    error: e,
  }),
  [SEND_PRODUCTS_REQUEST_START]: (state) => ({
    ...state,
    loading: true,
  }),
  [SEND_PRODUCTS_REQUEST_SUCCESS]: (state, { data }) => ({
    ...state,
    loading: false,
    currentItems: data,
  }),
  [SEND_PRODUCTS_REQUEST_ERROR]: (state, { e }) => ({
    ...state,
    error: e,
  }),
  [SHOP_SET_DEFAULT]: (state) => ({
    ...state,
    currentItems: [],
    currentRoute: null,
  }),
  [SET_FILTER_ITEMS]: (state, action) => ({
    ...state,
    filteredItems: action.payload,
  }),
  [RESET_FILTER_ITEMS]: (state, action) => ({
    ...state,
    filteredItems: [],
  }),
  DEFAULT: (state) => state,
};

const shopReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default shopReducer;
