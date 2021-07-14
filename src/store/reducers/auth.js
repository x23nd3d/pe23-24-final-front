import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_LOGOUT_START,
  AUTH_START,
  AUTH_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: false,
  expiresIn: null,
};

const handlers = {
  [AUTH_START]: (state) => ({ ...state, loading: true }),
  [AUTH_SUCCESS]: (state, { token, expiresIn }) => ({
    ...state,
    token,
    loading: false,
    expiresIn,
  }),
  [SIGNUP_SUCCESS]: (state) => ({ ...state, error: false, loading: false }),
  [AUTH_ERROR]: (state) => ({ ...state, error: true, loading: false }),
  [AUTH_LOGOUT_START]: (state) => ({ ...state, loading: true }),
  [AUTH_LOGOUT]: (state) => ({
    ...state,
    token: null,
    loading: false,
    expiresIn: null,
  }),

  DEFAULT: (state) => state,
};

const authReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default authReducer;
