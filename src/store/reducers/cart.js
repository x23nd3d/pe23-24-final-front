import {
  ADD_TO_CARD_INCREASE_COUNT,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  REMOVE_CART_PREVIEW,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  isPreviewActive: false,
  loading: false,
  error: false,
};

const handlers = {
  [ADD_TO_CART_START]: (state) => ({
    ...state,
    loading: true,
  }),
  [ADD_TO_CART_SUCCESS]: (state, { items }) => {
    console.log("RECEIVED REDUCER ITEM", items);
    return {
      ...state,
      loading: false,
      items,
      isPreviewActive: true,
    };
  },
  [ADD_TO_CARD_INCREASE_COUNT]: (state, { item }) => {
    const updatedItems = state.items;
    const currentItem = updatedItems.findIndex((goods) => goods.id === item.id);
    updatedItems[currentItem].count = item.count;

    return {
      ...state,
      items: updatedItems,
      loading: false,
      isPreviewActive: true,
    };
  },
  [ADD_TO_CART_ERROR]: (state, { e }) => ({
    ...state,
    error: e,
  }),
  [REMOVE_CART_PREVIEW]: (state) => ({
    ...state,
    isPreviewActive: false,
  }),
  DEFAULT: (state) => state,
};

const cartReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default cartReducer;
