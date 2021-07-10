import {
  RENDER_SIDEBAR_ITEMS_ERROR,
  RENDER_SIDEBAR_ITEMS_START,
  RENDER_SIDEBAR_ITEMS_SUCCESS,
} from "./actionTypes";

export function receiveRoutes(routes) {
  return async (dispatch) => {
    dispatch(receiveRoutesStart());
    try {
      dispatch(receiveRoutesSuccess(routes));
    } catch (e) {
      dispatch(receiveRoutesError(e));
    }
  };
}

export function receiveRoutesStart() {
  return {
    type: RENDER_SIDEBAR_ITEMS_START,
  };
}

export function receiveRoutesError(e) {
  return {
    type: RENDER_SIDEBAR_ITEMS_ERROR,
    error: e,
  };
}

export function receiveRoutesSuccess(routes) {
  console.log("Routes", routes);
  return {
    type: RENDER_SIDEBAR_ITEMS_SUCCESS,
    routes,
  };
}
