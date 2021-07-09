import { combineReducers } from "redux";

import navbarReducer from "./navbar.reducer";

const combineReducer = combineReducers({
  navbarReducer,
});

export default combineReducer;
