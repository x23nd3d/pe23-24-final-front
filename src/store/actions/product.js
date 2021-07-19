import { COLOR, PHOTO } from "./actionTypes";

export const colorAction = (value) => (dispatch, getState) => {
  const { color } = getState().product;
  if (color === value) {
    return value;
  }
  dispatch(setColor(value));
};

export const photoAction = (value) => ({
  type: PHOTO,
  payload: value,
});

export const setColor = (color) => ({
  type: COLOR,
  payload: color,
});