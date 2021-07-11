import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shopReducer from "./shopReducer";
import sidebarReducer from "./sidebar";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["shop", "sidebar"],
};

const rootReducer = combineReducers({
  shop: shopReducer,
  sidebar: sidebarReducer,
});

export default persistReducer(persistConfig, rootReducer);
