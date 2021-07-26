import {
  COLOR,
  PHOTO,
  VISITED_PRODUCTS,
  SELECT_CURRENT_ITEM,
  SELECT_CURRENT_ITEM_START,
  SEND_PRODUCT_REQUEST_ERROR,
} from "./actionTypes";
import axios from "../../axios/axios-product";

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
  visited.length === 4 && visited.shift();

  const set = new Set();
  visited[0] && visited.forEach(o => set.add(o));
  set.add(data);

  const [...unique] = set;

  dispatch({
    type: VISITED_PRODUCTS,
    payload: unique
  });
};

export const sendProductRequest = (id) => async (dispatch) => {
  dispatch(setItemStart());
  try {
    const result = await axios.get(id);
    const { data } = result;
    const currentItem = data[0];
    dispatch(colorAction(currentItem.color[0]));
    dispatch(photoAction(currentItem.photo[currentItem.color[0]]));
    dispatch(setItem(currentItem));
  } catch (e) {
    dispatch(sendProductRequestError(e));
  }
};

export const sendProductRequestError = (e) => ({
  type: SEND_PRODUCT_REQUEST_ERROR,
  e,
});
