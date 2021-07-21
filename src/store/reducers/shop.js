import {
  SAVE_FILTERED_ITEMS,
  RECEIVE_CURRENT_ROUTE_ERROR,
  RECEIVE_CURRENT_ROUTE_START,
  RECEIVE_CURRENT_ROUTE_SUCCESS,
  SEND_PRODUCTS_REQUEST_ERROR,
  SEND_PRODUCTS_REQUEST_START,
  SEND_PRODUCTS_REQUEST_SUCCESS,
  SHOP_SET_DEFAULT,
  FILTER_ITEMS_BY_PRICE,
  FILTER_ITEMS_BY_COLOR,
  RESET_FILTERED_ITEMS,
} from "../actions/actionTypes";

const initialState = {
  currentItems: [],
  filteredItems: [],
  currentRoute: "/shop/?category=all&type=all",
  loading: false,
  error: false,
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
  [SAVE_FILTERED_ITEMS]: (state, { filteredItems }) => ({
    ...state,
    filteredItems,
  }),
  [RESET_FILTERED_ITEMS]: (state) => ({
    ...state,
    filteredItems: initialState.filteredItems,
  }),
  [FILTER_ITEMS_BY_PRICE]: (state, { filteredItems }) => ({
    ...state,
    filteredItems,
  }),
  [FILTER_ITEMS_BY_COLOR]: (state, { filteredItems }) => ({
    ...state,
    filteredItems,
  }),
  DEFAULT: (state) => state,
};

const shopReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default shopReducer;
