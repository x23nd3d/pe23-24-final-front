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
  SET_ITEM_COUNT,
  SHOW_CART_PREVIEW,
  TOGGLE_CART_PREVIEW,
  USER_DISCOUNT_EXIST,
} from "./actionTypes";

import axios from "../../axios/axios-user";

function calculateTotal(array) {
  return array.reduce((result, item) => {
    let final = result;
    final += item.count * item.price;
    return Math.round(final * 100) / 100;
  }, 0);
}

function calculateTotalOff(cart, hasDiscount) {
  if (hasDiscount) {
    const { total } = cart;
    console.log("TOTAL", total);
    const { percentage } = cart.discount.code;
    const offPrice = (total * percentage) / 100;
    return total - offPrice;
  }
  return null;
}

export const addToCart = (item) => (dispatch, getState) => {
  const initialItems = getState().cart.items;
  const initialCart = getState().cart;

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
      const total = calculateTotal(initialItems);
      const totalOff = calculateTotalOff(
        initialCart,
        getState().cart.discount.code
      );
      return dispatch(updateCount(initialItems, total, totalOff));
    }

    // we do not have item, should add it first with count: 1
    const newItems = [...initialItems, itemToAdd];
    const total = calculateTotal(newItems);
    const totalOff = calculateTotalOff(
      initialCart,
      getState().cart.discount.code
    );
    return dispatch(addToCartSuccess(newItems, total, totalOff));
  } catch (e) {
    dispatch(addToCartError(e));
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

export const setItemCount = (items) => (dispatch, getState) => {
  const totalOff = calculateTotalOff(
    getState().cart,
    getState().cart.discount.code
  );

  return dispatch({
    type: SET_ITEM_COUNT,
    items,
    totalOff,
  });
};

export const increaseItemCount = (item) => (dispatch, getState) => {
  console.log("etState().cart", getState().cart.total);
  const totalOff = calculateTotalOff(
    getState().cart,
    getState().cart.discount.code
  );

  return dispatch({
    type: INCREASE_ITEM_COUNT,
    item,
    totalOff,
  });
};

export const decreaseItemCount = (item) => (dispatch, getState) => {
  const totalOff = calculateTotalOff(
    getState().cart,
    getState().cart.discount.code
  );

  return dispatch({
    type: DECREASE_ITEM_COUNT,
    item,
    totalOff,
  });
};
export const removeFromCart = (item) => (dispatch, getState) => {
  const totalOff = calculateTotalOff(
    getState().cart,
    getState().cart.discount.code
  );
  return dispatch({
    type: REMOVE_FROM_CART,
    item,
    totalOff,
  });
};

export const addToCartSuccess = (items, total, totalOff) => ({
  type: ADD_TO_CART_SUCCESS,
  items,
  total,
  totalOff,
});

export const addToCartStart = () => ({
  type: ADD_TO_CART_START,
});

export const addToCartError = (e) => ({
  type: ADD_TO_CART_ERROR,
  e,
});

export const updateCount = (items, total, totalOff) => ({
  type: ADD_TO_CARD_INCREASE_COUNT,
  items,
  total,
  totalOff,
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
  console.log("key.lengthkey.lengthkey.length", e.value.length);
  const { token } = getState().auth;
  const { userId } = getState().user;
  const { total } = getState().cart;
  const key = e.value;

  const typed = key.length >= 1;
  try {
    let request = null;
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
