import {
  ADD_TO_CARD_INCREASE_COUNT,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  AUTH_REFRESH_CART,
  CART_DISCOUNT_CODE_ERROR,
  CART_DISCOUNT_CODE_SUCCESS,
  CART_DISCOUNT_RESET,
  CLEAR_CART,
  DECREASE_ITEM_COUNT,
  INCREASE_ITEM_COUNT,
  REMOVE_FROM_CART,
  SELECT_CURRENT_ITEM,
  SET_DELIVERY_MANUALLY,
  SET_DELIVERY_METHOD,
  SET_DELIVERY_PAY,
  SET_ITEM_COUNT,
  SHOW_CART_PREVIEW,
  TOGGLE_CART_PREVIEW,
  TOGGLE_VERIFICATION,
  USER_DISCOUNT_EXIST,
  USER_DISCOUNT_FIRST_TIME,
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
    first_time_error: false,
  },
  deliveryPay: 0,
  isPreviewActive: false,
  isVerificationActive: false,
  isVerified: null,
  loading: false,
  error: false,
};

function calculateTotal(array, delivery) {
  return array.reduce((result, item) => {
    if (delivery > 0) {
      let final = result;
      final += item.count * item.price;
      const withDelivery = final + delivery;
      return Math.round(withDelivery * 100) / 100;
    }
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
  [AUTH_REFRESH_CART]: (state, { items }) => ({
    ...state,
    items,
    total: calculateTotal(items, state.deliveryPay),
    totalOff: calculateTotalOff(
      calculateTotal(items, state.deliveryPay),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(items, state.deliveryPay),
      state.discount.code
    ),
  }),
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
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
    isPreviewActive: true,
  }),
  [SET_DELIVERY_METHOD]: (state, { deliveryMethod }) => {
    if (deliveryMethod.trim() === "courier") {
      return {
        ...state,
        deliveryPay: 15,
        total: calculateTotal(state.items, state.deliveryPay),
        totalOff: calculateTotalOff(
          calculateTotal(state.items, state.deliveryPay),
          state.discount.code
        ),
        offSaved: calculateOffPrice(
          calculateTotal(state.items, state.deliveryPay),
          state.discount.code
        ),
      };
    }
    return {
      ...state,
      deliveryPay: 15,
      total: calculateTotal(state.items, state.deliveryPay),
      totalOff: calculateTotalOff(
        calculateTotal(state.items, state.deliveryPay),
        state.discount.code
      ),
      offSaved: calculateOffPrice(
        calculateTotal(state.items, state.deliveryPay),
        state.discount.code
      ),
    };
  },
  [SET_DELIVERY_MANUALLY]: (state, { deliveryMethod }) => {
    if (deliveryMethod.trim() === "courier") {
      return {
        ...state,
        deliveryPay: 15,
        total: calculateTotal(state.items, 15),
        totalOff: calculateTotalOff(
          calculateTotal(state.items, 15),
          state.discount.code
        ),
        offSaved: calculateOffPrice(
          calculateTotal(state.items, 15),
          state.discount.code
        ),
      };
    }
    return {
      ...state,
      deliveryPay: 0,
      total: calculateTotal(state.items, 0),
      totalOff: calculateTotalOff(
        calculateTotal(state.items, 0),
        state.discount.code
      ),
      offSaved: calculateOffPrice(
        calculateTotal(state.items, 0),
        state.discount.code
      ),
    };
  },
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
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items, state.deliveryPay),
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
    total: calculateTotal(state.items, state.deliveryPay),
    totalOff: calculateTotalOff(
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
  }),
  [DECREASE_ITEM_COUNT]: (state, { item }) => ({
    ...state,
    items: manageCountUpdate(state.items, item, "minus"),
    total: calculateTotal(state.items, state.deliveryPay),
    totalOff: calculateTotalOff(
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items, state.deliveryPay),
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
      total: calculateTotal(updatedItems, state.deliveryPay),
      discount: {
        code: !updatedItems.length ? null : state.discount.code,
      },
      totalOff: calculateTotalOff(
        calculateTotal(updatedItems, state.deliveryPay),
        state.discount.code
      ),
      offSaved: calculateOffPrice(
        calculateTotal(updatedItems, state.deliveryPay),
        state.discount.code
      ),
    };
  },
  [SET_ITEM_COUNT]: (state, { items }) => ({
    ...state,
    items,
    total: calculateTotal(state.items, state.deliveryPay),
    totalOff: calculateTotalOff(
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items, state.deliveryPay),
      state.discount.code
    ),
  }),
  [CART_DISCOUNT_CODE_SUCCESS]: (state, { code, totalOff, offSaved }) => ({
    ...state,
    discount: {
      error: false,
      code,
      exists: false,
      first_time_error: false,
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
      first_time_error: false,
    },
    totalOff: 0,
  }),
  [CART_DISCOUNT_RESET]: (state) => ({
    ...state,
    discount: {
      error: false,
      code: null,
      exists: false,
      first_time_error: false,
    },
  }),
  [USER_DISCOUNT_EXIST]: (state) => ({
    ...state,
    discount: {
      error: true,
      code: null,
      exists: true,
      first_time_error: false,
    },
  }),
  [USER_DISCOUNT_FIRST_TIME]: (state) => ({
    ...state,
    discount: {
      error: true,
      code: null,
      exists: false,
      typed: true,
      first_time_error: true,
    },
  }),
  [SET_DELIVERY_PAY]: (state, { deliveryPay }) => ({
    ...state,
    deliveryPay,
    total: calculateTotal(state.items, deliveryPay),
    totalOff: calculateTotalOff(
      calculateTotal(state.items, deliveryPay),
      state.discount.code
    ),
    offSaved: calculateOffPrice(
      calculateTotal(state.items, deliveryPay),
      state.discount.code
    ),
  }),
  [TOGGLE_VERIFICATION]: (state, { isVerificationActive }) => ({
    ...state,
    isVerificationActive,
  }),
  [CLEAR_CART]: (state) => ({
    ...state,
    items: [],
    total: 0,
    totalOff: null,
    offSaved: null,
    discount: {
      error: false,
      code: null,
      typed: false,
      exists: false,
      first_time_error: false,
    },
    isPreviewActive: false,
    isVerificationActive: false,
    isVerified: null,
    loading: false,
    error: false,
  }),
  DEFAULT: (state) => state,
};

const cartReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default cartReducer;
