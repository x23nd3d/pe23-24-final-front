import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import shopReducer from "./shopReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["shop"],
};

const rootReducer = combineReducers({
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
