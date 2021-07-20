import {
  RECEIVE_CURRENT_ROUTE_START,
  RECEIVE_CURRENT_ROUTE_SUCCESS,
  SELECT_PRODUCT_PREVIEW_PARAMS,
  SEND_PRODUCTS_REQUEST_ERROR,
  SEND_PRODUCTS_REQUEST_START,
  SEND_PRODUCTS_REQUEST_SUCCESS,
  SHOP_SET_DEFAULT,
} from "./actionTypes";
import axios from "../../axios/axios-shop";

export function receiveCurrentRoute(route) {
  return (dispatch, getState) => {
    try {
      const current = getState().shop.currentRoute;
      const { currentItems } = getState().shop;
      if (route === current && currentItems.length > 0) {
        return;
      }
      dispatch(receiveRouteStart());
      dispatch(receiveRouteSuccess(route));
      dispatch(sendProductsRequest(route));
    } catch (e) {
      console.error(e);
      dispatch(receiveRouteError(e));
    }
  };
}

export function sendProductsRequest(route) {
  return async (dispatch) => {
    try {
      dispatch(sendProductsRequestStart());
      const result = await axios.get(route);
      const { data } = result;
      dispatch(sendProductsRequestSuccess(data));
    } catch (e) {
      console.error(e);
      dispatch(sendProductsRequestError(e));
    }
  };
}

export const handleItemPreviewParams =
  (item, param, value) => (dispatch, getState) => {
    const { currentPreviewItems } = getState().shop;
    const currentPreviewItemsList = [...currentPreviewItems];
    const idx = currentPreviewItemsList.findIndex(
      (current) => current.id === item.id
    );

    console.log("currentPreviewItemsList", currentPreviewItemsList);
    // updatedItems = currentPreviewItemsList.map(
    //   // eslint-disable-next-line no-param-reassign
    //   (currentItem) => (currentItem[idx][param] = value)
    // );

    currentPreviewItemsList[idx][param] = value;

    dispatch(setItemPreview(currentPreviewItemsList));
  };

export const setItemPreview = (items) => ({
  type: SELECT_PRODUCT_PREVIEW_PARAMS,
  items,
});

export function sendProductsRequestStart() {
  return {
    type: SEND_PRODUCTS_REQUEST_START,
  };
}

export function sendProductsRequestSuccess(data) {
  return {
    type: SEND_PRODUCTS_REQUEST_SUCCESS,
    data,
  };
}

export function sendProductsRequestError(e) {
  return {
    type: SEND_PRODUCTS_REQUEST_ERROR,
    e,
  };
}

export function receiveRouteStart() {
  return {
    type: RECEIVE_CURRENT_ROUTE_START,
  };
}

export function receiveRouteSuccess(route) {
  return {
    type: RECEIVE_CURRENT_ROUTE_SUCCESS,
    route,
  };
}

export function receiveRouteError(e) {
  return {
    type: RECEIVE_CURRENT_ROUTE_START,
    e,
  };
}

export function setShopDefault() {
  return {
    type: SHOP_SET_DEFAULT,
  };
}
