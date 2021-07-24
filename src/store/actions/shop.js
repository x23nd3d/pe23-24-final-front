import {
  PAGINATION_ADD_MORE_ITEMS,
  PAGINATION_ADD_MORE_ITEMS_START,
  PAGINATION_SET_CONFIG,
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
      // console.error(e);
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
      // console.error(e);
      dispatch(sendProductsRequestError(e));
    }
  };
}

export const handleItemPreviewParams =
  (item, param, value) => (dispatch, getState) => {
    const { currentPreviewItems } = getState().shop;
    const { filteredItems } = getState().shop;
    const currentPreviewItemsList = [...currentPreviewItems];
    const idx = currentPreviewItemsList.findIndex(
      (current) => current.id === item.id
    );

    const oldObj = currentPreviewItemsList.find(
      (searchItem) => searchItem.id === item.id
    );
    const newObj = { ...oldObj, [param]: value };
    const newItems = [
      ...currentPreviewItemsList.slice(0, idx),
      newObj,
      ...currentPreviewItemsList.slice(idx + 1),
    ];

    dispatch(setItemPreview(newItems));
  };

export const setItemPreview = (data) => ({
  type: SELECT_PRODUCT_PREVIEW_PARAMS,
  data,
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

export function paginationSetConfig() {
  return (dispatch, getState) => {
    const { currentItems, filteredItems } = getState().shop;
    const settings = getState().shop;
    const { step } = settings;
    const currentStep = 10;
    const allItemsCount = filteredItems.length
      ? filteredItems.length
      : currentItems.length;
    let leftCount = null;

    if (allItemsCount > step) {
      leftCount = allItemsCount - step;
    }

    if (
      step === currentStep &&
      settings.allItemsCount === allItemsCount &&
      leftCount === allItemsCount - currentStep
    ) {
      return;
    }

    dispatch(implementPaginationConfig(leftCount, allItemsCount, currentStep));
  };
}

export function implementPaginationConfig(leftCount, allItemsCount, step) {
  return {
    type: PAGINATION_SET_CONFIG,
    leftCount,
    allItemsCount,
    step,
  };
}

export function addMoreItemsStart() {
  return {
    type: PAGINATION_ADD_MORE_ITEMS_START,
  };
}

export function addMoreItems(addStepCount) {
  return (dispatch, getState) => {
    dispatch(addMoreItemsStart());
    const { leftCount, step, allItemsCount } = getState().shop;
    let time = 0;

    if (leftCount > 5) {
      time = 1500;
    } else if (leftCount === 0) {
      time = 0;
    } else {
      time = 500;
    }

    setTimeout(() => {
      const defaultStep = 10;
      let newLeftCount = addStepCount;
      let newDefaultStep = step;

      if (leftCount <= newLeftCount) {
        if (leftCount === 0) {
          return dispatch(addStep(defaultStep, allItemsCount - defaultStep));
        }
        newDefaultStep = leftCount;
        newLeftCount = leftCount - newDefaultStep;
        return dispatch(addStep(newDefaultStep, newLeftCount));
      }
      newLeftCount = leftCount - addStepCount;
      newDefaultStep = leftCount;
      return dispatch(addStep(newDefaultStep, newLeftCount));
    }, time);
  };
}

export function addStep(step, leftCount) {
  return {
    type: PAGINATION_ADD_MORE_ITEMS,
    step,
    leftCount,
  };
}
