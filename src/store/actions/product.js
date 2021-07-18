import { COLOR, SELECT_CURRENT_ITEM } from "./actionTypes";

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

  if (currentItem === item) {
    return;
  }
  dispatch(setItem(item));
};

export const setItem = (item) => ({
  type: SELECT_CURRENT_ITEM,
  payload: item,
});
