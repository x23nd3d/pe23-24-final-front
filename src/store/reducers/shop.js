import {
  RECEIVE_CURRENT_ROUTE_START,
  RECEIVE_CURRENT_ROUTE_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  currentItems: [],
  currentRoute: null,
  loading: false,
  error: false,
};

const handlers = {
  [RECEIVE_CURRENT_ROUTE_START]: (state) => ({ ...state, loading: true }),
  [RECEIVE_CURRENT_ROUTE_SUCCESS]: (state, { route }) => ({
    ...state,
    loading: false,
    currentRoute: route,
  }),
  DEFAULT: (state) => state,
};

const shopReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default shopReducer;
