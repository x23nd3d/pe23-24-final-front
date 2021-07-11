const initialState = {
  currentItems: [],
  currentRoute: null,
  loading: false,
  error: false,
};

const handlers = {
  DEFAULT: (state) => state,
};

const shopReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default shopReducer;
