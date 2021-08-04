import { SIDEBAR_SWITCHER } from "../actions/actionTypes";

const INITIAL_STATE = {
  burgerActive: true,
};

const handlers = {
  [SIDEBAR_SWITCHER]: (state, action) => ({
    ...state,
    burgerActive: !state.burgerActive,
  }),
  DEFAULT: (state) => state,
};

const navbarReducer = (state = INITIAL_STATE, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default navbarReducer;
