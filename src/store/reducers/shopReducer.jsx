import {
  RENDER_SIDEBAR_ITEMS_ERROR,
  RENDER_SIDEBAR_ITEMS_START,
  RENDER_SIDEBAR_ITEMS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: false,
  sidebarRoutes: [],
  colorFilter: null,
  priceFilter: null,
  currentRoutes: [],
};

const handlers = {
  [RENDER_SIDEBAR_ITEMS_START]: (state) => ({ ...state, loading: true }),
  [RENDER_SIDEBAR_ITEMS_SUCCESS]: (state, { routes }) => ({
    ...state,
    loading: false,
    currentRoutes: routes,
  }),
  [RENDER_SIDEBAR_ITEMS_ERROR]: (state) => ({
    ...state,
    loading: true,
    error: true,
  }),
  DEFAULT: (state) => state,
};

const shopReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default shopReducer;
