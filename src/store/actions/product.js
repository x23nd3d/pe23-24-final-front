import { ADD_TO_CART } from "./actionTypes";

export const handleProduct = (values) => (dispatch, getState) => {
  const { color } = getState().product;
  if (color === values.color) {
    return values;
  }
    dispatch(setProduct(values));

};

export const setProduct = (values) => ({
  type: ADD_TO_CART,
  payload: values,
});