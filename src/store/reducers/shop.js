import {
  RECEIVE_CURRENT_ROUTE_ERROR,
  RECEIVE_CURRENT_ROUTE_START,
  RECEIVE_CURRENT_ROUTE_SUCCESS,
  SELECT_PRODUCT_PREVIEW_PARAMS,
  RESET_FILTER_ITEMS,
  SET_FILTER_ITEMS,
  SEND_PRODUCTS_REQUEST_ERROR,
  SEND_PRODUCTS_REQUEST_START,
  SEND_PRODUCTS_REQUEST_SUCCESS,
  SHOP_SET_DEFAULT,
} from "../actions/actionTypes";

const initialState = {
  currentItems: [],
  currentPreviewItems: [],
  currentRoute: "/shop/?category=all&type=all",
  loading: false,
  error: false,
  filteredItems: [],
};

const transformPreviewItems = (array) => {
  const newItems = array.map((item) => {
    if (item.color.length === 1) {
      const newObjects = {
        ...item,
        color: item.color[0],
      };

      return newObjects;
    }

    if (item.size.length === 1) {
      const newObjects = {
        ...item,
        size: item.size[0],
      };
      return newObjects;
    }

    return item;
  });

  return newItems;
};

const handlers = {
  [RECEIVE_CURRENT_ROUTE_START]: (state) => ({
    ...state,
    loading: true,
    filteredItems: [],
  }),
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
    filteredItems: [],
    currentPreviewItems: transformPreviewItems(data),
  }),
  [SEND_PRODUCTS_REQUEST_ERROR]: (state, { e }) => ({
    ...state,
    error: e,
  }),
  [SELECT_PRODUCT_PREVIEW_PARAMS]: (state, { data }) => ({
    ...state,
    currentPreviewItems: transformPreviewItems(data),
  }),
  [SHOP_SET_DEFAULT]: (state) => ({
    ...state,
    currentItems: [],
    currentRoute: null,
  }),
  [SET_FILTER_ITEMS]: (state, action) => ({
    ...state,
    filteredItems: action.payload,
    currentPreviewItems: transformPreviewItems(action.payload),
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
