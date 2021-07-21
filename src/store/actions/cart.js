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
} from "./actionTypes";
import {
  allowBodyScrolling,
  preventBodyScrolling,
} from "../../utils/bodyStyling";

function calculateTotal(array) {
  return array.reduce((result, item) => {
    let final = result;
    final += item.count * item.price;
    return final;
  }, 0);
}

export const addToCart = (item) => (dispatch, getState) => {
  const initialItems = getState().cart.items;

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
      preventBodyScrolling();
      const total = calculateTotal(initialItems);
      return dispatch(updateCount(initialItems, total));
    }

    // we do not have item, should add it first with count: 1
    const newItems = [...initialItems, itemToAdd];
    preventBodyScrolling();
    const total = calculateTotal(newItems);
    return dispatch(addToCartSuccess(newItems, total));
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

// export const updateTotal = (value) => ({
//
// })

export const toggleCartPreviewHandler = () => (dispatch, getState) => {
  const { isPreviewActive } = getState().cart;
  if (!isPreviewActive) {
    return;
  }
  allowBodyScrolling();
  return dispatch(toggleCartPreview());
};

export const openCart = () => {
  preventBodyScrolling();
  return {
    type: SHOW_CART_PREVIEW,
  };
};

export const toggleCartPreview = () => ({
  type: TOGGLE_CART_PREVIEW,
});
