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

  const set = new Set();
  visited.forEach(o => set.add(o));
  set.add(data);

  dispatch({
    type: VISITED_PRODUCTS,
    payload: set
  })
}

// export const visitedProductsAction = (value) => ({
//   type: VISITED_PRODUCTS,
//   payload: value
// })
