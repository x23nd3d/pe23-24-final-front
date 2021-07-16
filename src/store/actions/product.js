import { PRODUCT_RECEIVE_COLOR } from "./actionTypes";

export const handleColor = (value) => (dispatch, getState) => {
  const { color } = getState().product;
  console.log("CURRENT VALUE REDUX", value);
  if (color === value) {
    return null;
  }

  dispatch(setColor(value));
};

export const setColor = (color) => ({
  type: PRODUCT_RECEIVE_COLOR,
  payload: color,
});
