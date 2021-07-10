import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shopReducer from "./shop";
import authReducer from "./auth";
import userReducer from "./user";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["shop", "auth", "user"],
};

const rootReducer = combineReducers({
  shop: shopReducer,
  auth: authReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
