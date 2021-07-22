import {
  COLOR,
  PHOTO, VISITED_PRODUCTS,
  SELECT_CURRENT_ITEM,
  SELECT_CURRENT_ITEM_START,
} from "./actionTypes";

/* eslint-disable guard-for-in */
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


export const visitedProductsAction = (data) => (dispatch, getState) => {
  const {visited} = getState().product;

  const set = new Set();
  if (visited.size === 0) {
    for(const o in visited) {
      o && set.add(o);
    }
  }

  visited.size < 4 && set.add(data);

  dispatch({
    type: VISITED_PRODUCTS,
    payload: set
  })
}