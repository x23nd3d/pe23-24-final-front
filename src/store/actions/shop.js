import { RECEIVE_CURRENT_ROUTE_START } from "./actionTypes";

export function receiveCurrentRoute(route) {
  return (dispatch, getState) => {
    const current = getState().shop.currentRoute;
    console.log("RECEIVED", route);
    console.log("Current", current);
  };
}

export function receiveRouteStart() {
  return {
    type: RECEIVE_CURRENT_ROUTE_START,
  };
}

export function receiveRouteSuccess(route) {
  return {
    type: RECEIVE_CURRENT_ROUTE_START,
    route,
  };
}

export function receiveRouteError(e) {
  return {
    type: RECEIVE_CURRENT_ROUTE_START,
    e,
  };
}
