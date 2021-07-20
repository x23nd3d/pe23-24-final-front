import {
  ADD_TO_CARD_INCREASE_COUNT,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  DECREASE_ITEM_COUNT,
  INCREASE_ITEM_COUNT,
  REMOVE_FROM_CART,
  SET_ITEM_COUNT,
  SHOW_CART_PREVIEW,
  TOGGLE_CART_PREVIEW,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  total: 0,
  isPreviewActive: false,
  loading: false,
  error: false,
};

function calculateTotal(array) {
  return array.reduce((result, item) => {
    let final = result;
    final += item.count * item.price;
    return final;
  }, 0);
}

function manageCountUpdate(array, item, action) {
  const currentItem = array.find((current) => current === item);
  const allItems = array;
  const idx = allItems.indexOf(currentItem);
  if (action === "plus") {
    allItems[idx].count = item.count + 1;
  } else if (action === "minus") {
    allItems[idx].count = item.count - 1;
  }
  return allItems;
}

const handlers = {
  [ADD_TO_CART_START]: (state) => ({
    ...state,
    loading: true,
  }),
  [ADD_TO_CART_SUCCESS]: (state, { items, total }) => ({
    ...state,
    loading: false,
    items,
    total,
    isPreviewActive: true,
  }),
  [ADD_TO_CARD_INCREASE_COUNT]: (state, { items, total }) => ({
    ...state,
    items,
    loading: false,
    total,
    isPreviewActive: true,
  }),
  [ADD_TO_CART_ERROR]: (state, { e }) => ({
    ...state,
    error: e,
  }),
  [TOGGLE_CART_PREVIEW]: (state) => ({
    ...state,
    isPreviewActive: !state.isPreviewActive,
  }),
  [SHOW_CART_PREVIEW]: (state) => ({
    ...state,
    isPreviewActive: true,
  }),
  [INCREASE_ITEM_COUNT]: (state, { item }) => ({
    ...state,
    items: manageCountUpdate(state.items, item, "plus"),
    total: calculateTotal(state.items),
  }),
  [DECREASE_ITEM_COUNT]: (state, { item }) => ({
    ...state,
    items: manageCountUpdate(state.items, item, "minus"),
    total: calculateTotal(state.items),
  }),
  [REMOVE_FROM_CART]: (state, { item }) => {
    const idx = state.items.findIndex((current) => current.id === item.id);
    const updatedItems = [
      ...state.items.slice(0, idx),
      ...state.items.slice(idx + 1),
    ];
    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
    };
  },
  [SET_ITEM_COUNT]: (state, { items }) => ({
    ...state,
    items,
    total: calculateTotal(state.items),
  }),
  DEFAULT: (state) => state,
};

const cartReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default cartReducer;
