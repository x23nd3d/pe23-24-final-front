import { AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  userId: {},
  loading: false,
  error: false,
};

const handlers = {
  [AUTH_SUCCESS]: (state, { user }) => ({ ...state, userId: user }),
  [AUTH_LOGOUT]: (state) => ({ ...state, userId: null }),
  DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
export default userReducer;
