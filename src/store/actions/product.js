import { COLOR, PHOTO, VISITED_PRODUCTS } from "./actionTypes";

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

export const visitedProductsAction = (data) => (dispatch, getState) => {
  const {visited} = getState().product;
  visited.add(data);

  dispatch({
    type: VISITED_PRODUCTS,
    payload: visited
  })
}

// export const visitedProductsAction = (value) => ({
//   type: VISITED_PRODUCTS,
//   payload: value
// })
