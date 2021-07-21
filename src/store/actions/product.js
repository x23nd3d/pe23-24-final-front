import {
  COLOR,
  SELECT_CURRENT_ITEM,
  SELECT_CURRENT_ITEM_START,
  SELECT_PRODUCT_PREVIEW_PARAMS,
} from "./actionTypes";

export const colorAction = (value) => (dispatch, getState) => {
  const { color } = getState().product;
  if (color === value) {
    return value;
  }
  dispatch(setColor(value));
};

export const setColor = (color) => ({
  type: COLOR,
  payload: color,
});

export const selectCurrentItem = (item) => (dispatch, getState) => {
  const { currentItem } = getState().product;
  dispatch(setItemStart());

  if (currentItem === item) {
    return;
  }
  dispatch(setItem(item));
};

export const setItem = (item) => ({
  type: SELECT_CURRENT_ITEM,
  payload: item,
});

export const setItemStart = () => ({
  type: SELECT_CURRENT_ITEM_START,
});
