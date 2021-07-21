import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
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
  stateReconciler: autoMergeLevel2,
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
