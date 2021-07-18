import { COLOR } from "./actionTypes";

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