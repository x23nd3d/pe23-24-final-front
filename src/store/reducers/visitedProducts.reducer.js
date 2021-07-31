import { ADD_VISITED_PRODUCT } from "../actions/actionTypes";

const INITIAL_STATE = {
  visitedProducts: [],
};

const handlers = {
  [ADD_VISITED_PRODUCT]: (state, action) => ({
    ...state,
    visitedProducts: action.payload,
  }),
  DEFAULT: (state) => state,
};

const visitedProductsReducer = (state = INITIAL_STATE, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default visitedProductsReducer;
