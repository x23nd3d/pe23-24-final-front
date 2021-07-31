import {
  ADD_TO_CARD_INCREASE_COUNT,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  CART_DISCOUNT_CODE_ERROR,
  CART_DISCOUNT_CODE_SUCCESS,
  CART_DISCOUNT_RESET,
  CLEAR_CART,
  DECREASE_ITEM_COUNT,
  INCREASE_ITEM_COUNT,
  REMOVE_FROM_CART,
  SET_ITEM_COUNT,
  SHOW_CART_PREVIEW,
  TOGGLE_CART_PREVIEW,
  TOGGLE_VERIFICATION,
  USER_DISCOUNT_EXIST,
} from "./actionTypes";

import axios from "../../axios/axios-user";

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

export const addToCart = (item) => (dispatch, getState) => {
  const initialItems = getState().cart.items;
  const { deliveryPay } = getState().cart;

  const itemFound = initialItems.find((goods) => {
    const itemToCheck = { ...goods };
    delete itemToCheck.count;
    if (JSON.stringify(itemToCheck) === JSON.stringify(item)) return goods;
    return null;
  });
  try {
    dispatch(addToCartStart());

    const itemToAdd = {
      ...item,
      count: 1,
    };

    if (itemFound) {
      // we have item in card, we should add count
      const idx = initialItems.indexOf(itemFound);
      initialItems[idx].count += 1;
      const total = calculateTotal(initialItems, deliveryPay);
      return dispatch(updateCount(initialItems, total));
    }

    // we do not have item, should add it first with count: 1
    const newItems = [...initialItems, itemToAdd];
    const total = calculateTotal(newItems, deliveryPay);
    return dispatch(addToCartSuccess(newItems, total));
  } catch (e) {
    dispatch(addToCartError(e));
  }
};

export const saveCart = () => async (dispatch, getState) => {
  const { items, total, totalOff, offSaved, deliveryPay, discount } =
    getState().cart;
  const { token } = getState().auth;

  const cart = {
    items,
    total,
    totalOff,
    offSaved,
    deliveryPay,
    discount,
  };

  try {
    const request = await axios.post(
      "/addToCart",
      { cart },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(request.data, "request.data");
    return request.data;
  } catch (e) {
    console.error(e);
  }
};

export const setItemCountHandler = (item, count) => (dispatch, getState) => {
  const initialItems = getState().cart.items;
  const currentItem = initialItems.find((current) => current === item);
  const idx = initialItems.indexOf(currentItem);

  if (count === 0) {
    return dispatch(setItemCount(initialItems));
  }

  if (count === item.count) return;

  initialItems[idx].count = count;
  return dispatch(setItemCount(initialItems));
};

export const setItemCount = (items) => ({
  type: SET_ITEM_COUNT,
  items,
});

export const increaseItemCount = (item) => ({
  type: INCREASE_ITEM_COUNT,
  item,
});

export const decreaseItemCount = (item) => ({
  type: DECREASE_ITEM_COUNT,
  item,
});

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  item,
});

export const addToCartSuccess = (items, total) => ({
  type: ADD_TO_CART_SUCCESS,
  items,
  total,
});

export const addToCartStart = () => ({
  type: ADD_TO_CART_START,
});

export const addToCartError = (e) => ({
  type: ADD_TO_CART_ERROR,
  e,
});

export const updateCount = (items, total) => ({
  type: ADD_TO_CARD_INCREASE_COUNT,
  items,
  total,
});

export const toggleCartPreviewHandler = () => (dispatch, getState) => {
  const { isPreviewActive } = getState().cart;
  if (!isPreviewActive) {
    return;
  }
  return dispatch(toggleCartPreview());
};

export const openCart = () => ({
  type: SHOW_CART_PREVIEW,
});

export const toggleCartPreview = () => ({
  type: TOGGLE_CART_PREVIEW,
});

export const checkDiscount = (e) => async (dispatch, getState) => {
  const { token } = getState().auth;
  const { userId } = getState().user;
  const { total } = getState().cart;
  const { items } = getState().cart;
  const key = e.value;

  const typed = key.length >= 1;
  try {
    let request = null;

    if (!items.length) {
      return;
    }

    if (userId && token) {
      request = await axios.post(
        "/checkDiscount",
        { key },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    } else {
      request = await axios.post("/discountChecker", { key });
    }
    const response = request.data;
    if (response.currentDiscount) {
      const offPrice = (total * response.currentDiscount.percentage) / 100;
      const result = total - offPrice;
      return dispatch(
        discountCheckSuccess(response.currentDiscount, result, offPrice)
      );
    }

    if (response.error === "already_exists") {
      return dispatch(checkDiscountExists());
    }
    return dispatch(discountCheckError(typed));
  } catch (error) {
    console.error(error);
  }
};

export const checkDiscountExists = () => ({
  type: USER_DISCOUNT_EXIST,
});

export const discountCheckSuccess = (code, totalOff, offSaved) => ({
  type: CART_DISCOUNT_CODE_SUCCESS,
  code,
  totalOff,
  offSaved,
});

export const discountCheckError = (typed) => ({
  type: CART_DISCOUNT_CODE_ERROR,
  typed,
});

export const resetDiscount = () => (dispatch, getState) => {
  const { code } = getState().cart.discount;

  if (code) return;

  dispatch(discountReset());
};

export const discountReset = () => ({
  type: CART_DISCOUNT_RESET,
});

export const verificationToggle = (isVerificationActive) => ({
  type: TOGGLE_VERIFICATION,
  isVerificationActive,
});

export const clearCartHandler = () => ({
  type: CLEAR_CART,
});
