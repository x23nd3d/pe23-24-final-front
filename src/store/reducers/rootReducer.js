import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth";
import userReducer from "./user";
import shopReducer from "./shop";
import sidebarReducer from "./sidebar";
import productReducer from "./product";
import cartReducer from "./cart";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "shop", "sidebar", "product", "cart"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  shop: shopReducer,
  sidebar: sidebarReducer,
  product: productReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
