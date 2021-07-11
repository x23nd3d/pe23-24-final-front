import {
  RECEIVE_CURRENT_ROUTE_START,
  RECEIVE_CURRENT_ROUTE_SUCCESS,
} from "./actionTypes";

export function receiveCurrentRoute(route) {
  return (dispatch, getState) => {
    try {
      dispatch(receiveRouteStart());
      const current = getState().shop.currentRoute;

      console.log("RECEIVED", route);
      console.log("Current", current);
      dispatch(receiveRouteSuccess(route));
    } catch (e) {
      console.error(e);
      dispatch(receiveRouteError(e));
    }
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
