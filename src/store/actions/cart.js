import {
  ADD_TO_CARD_INCREASE_COUNT,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  REMOVE_CART_PREVIEW,
} from "./actionTypes";
import {
  allowBodyScrolling,
  preventBodyScrolling,
} from "../../utils/bodyStyling";

export const addToCart = (item) => (dispatch, getState) => {
  const { items } = getState().cart;
  const idx = items.findIndex((goods) => goods.id === item.id);
  const currentItem = items[idx];

  console.log("CURRENT ITEMS: ", items);
  console.log("ITEM TO BE ADDED: ", item);

  try {
    dispatch(addToCartStart());
    if (idx >= 0) {
      // we have item in card, we should add count
      console.log("WE have item, so add count");
      currentItem.count += 1;
      preventBodyScrolling();
      return dispatch(updateCount(currentItem));
    }
    // we do not have item, should add it first with count: 1
    console.log("WE do not have item, so add item to cart");
    const itemToAdd = {
      ...item,
      count: 1,
    };
    const updatedItems = [...items, itemToAdd];

    console.log("itemToAdditemToAdditemToAdditemToAdd", itemToAdd);

    console.log("updatedItemsupdatedItemsupdatedItems", updatedItems);

    preventBodyScrolling();
    return dispatch(addToCartSuccess(updatedItems));
  } catch (e) {
    dispatch(addToCartError(e));
  }
};

export const addToCartSuccess = (items) => ({
  type: ADD_TO_CART_SUCCESS,
  items,
});

export const addToCartStart = () => ({
  type: ADD_TO_CART_START,
});

export const addToCartError = (e) => ({
  type: ADD_TO_CART_ERROR,
  e,
});

export const updateCount = (item) => ({
  type: ADD_TO_CARD_INCREASE_COUNT,
  item,
});

export const removeCartPreviewHandler = () => (dispatch, getState) => {
  const { isPreviewActive } = getState().cart;
  if (!isPreviewActive) {
    return;
  }
  allowBodyScrolling();
  return dispatch(removeCartPreview());
};

export const removeCartPreview = () => ({
  type: REMOVE_CART_PREVIEW,
});
