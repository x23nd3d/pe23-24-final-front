import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import userReducer from "./user";
import shopReducer from "./shop";
import sidebarReducer from "./sidebar";
import productReducer from "./productReducer";
import photoReducer from "./photoReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "shop", "sidebar", "product", "photo"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  shop: shopReducer,
  sidebar: sidebarReducer,
  product: productReducer,
  photo: photoReducer,
});

export default persistReducer(persistConfig, rootReducer);
