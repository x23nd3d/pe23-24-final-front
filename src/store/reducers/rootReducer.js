import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import userReducer from "./user";
import shopReducer from "./shop";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "shop"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
