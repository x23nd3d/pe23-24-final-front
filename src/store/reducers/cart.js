import {
  ADD_TO_CARD_INCREASE_COUNT,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  CART_DISCOUNT_CODE_ERROR,
  CART_DISCOUNT_CODE_SUCCESS,
  CART_DISCOUNT_RESET,
  DECREASE_ITEM_COUNT,
  INCREASE_ITEM_COUNT,
  REMOVE_FROM_CART,
  SELECT_CURRENT_ITEM,
  SET_ITEM_COUNT,
  SHOW_CART_PREVIEW,
  TOGGLE_CART_PREVIEW,
  USER_DISCOUNT_EXIST,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  total: 0,
  totalOff: null,
  offSaved: null,
  discount: {
    error: false,
    code: null,
    typed: false,
    exists: false,
  },
  isPreviewActive: false,
  loading: false,
  error: false,
};

function calculateTotal(array) {
  return array.reduce((result, item) => {
    let final = result;
    final += item.count * item.price;
    return Math.round(final * 100) / 100;
  }, 0);
}

function calculateTotalOff(total, hasDiscount) {
  if (hasDiscount) {
    const { percentage } = hasDiscount;
    const offPrice = (total * percentage) / 100;
    const result = total - offPrice;
    return Math.round(result * 100) / 100;
  }
  return null;
}

function calculateOffPrice(total, hasDiscount) {
  if (hasDiscount) {
    const result = (total * hasDiscount.percentage) / 100;
    return Math.round(result * 100) / 100;
  }
  return null;
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
    totalOff: calculateTotalOff(
      calculateTotal(state.items),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items),
      state.discount.code
    ),
    isPreviewActive: true,
  }),
  [SELECT_CURRENT_ITEM]: (state) => ({
    ...state,
    isPreviewActive: false,
  }),
  [ADD_TO_CARD_INCREASE_COUNT]: (state, { items, total }) => ({
    ...state,
    items,
    loading: false,
    total,
    totalOff: calculateTotalOff(
      calculateTotal(state.items),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items),
      state.discount.code
    ),
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
    totalOff: calculateTotalOff(
      calculateTotal(state.items),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items),
      state.discount.code
    ),
  }),
  [DECREASE_ITEM_COUNT]: (state, { item }) => ({
    ...state,
    items: manageCountUpdate(state.items, item, "minus"),
    total: calculateTotal(state.items),
    totalOff: calculateTotalOff(
      calculateTotal(state.items),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items),
      state.discount.code
    ),
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
      discount: {
        code: !state.items.length ? null : state.discount.code,
      },
      totalOff: calculateTotalOff(
        calculateTotal(updatedItems),
        state.discount.code
      ),
      offSaved: calculateOffPrice(
        calculateTotal(updatedItems),
        state.discount.code
      ),
    };
  },
  [SET_ITEM_COUNT]: (state, { items }) => ({
    ...state,
    items,
    total: calculateTotal(state.items),
    totalOff: calculateTotalOff(
      calculateTotal(state.items),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items),
      state.discount.code
    ),
  }),
  [CART_DISCOUNT_CODE_SUCCESS]: (state, { code, totalOff, offSaved }) => ({
    ...state,
    discount: {
      error: false,
      code,
      exists: false,
    },
    totalOff,
    offSaved,
  }),
  [CART_DISCOUNT_CODE_ERROR]: (state, { typed }) => ({
    ...state,
    discount: {
      error: true,
      typed,
      exists: false,
    },
    totalOff: 0,
  }),
  [CART_DISCOUNT_RESET]: (state) => ({
    ...state,
    discount: {
      error: false,
      code: null,
      exists: false,
    },
  }),
  [USER_DISCOUNT_EXIST]: (state) => ({
    ...state,
    discount: {
      error: true,
      code: null,
      exists: true,
    },
  }),
  DEFAULT: (state) => state,
};

const cartReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default cartReducer;
