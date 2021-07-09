import { createStore, applyMiddleware, compose } from "redux";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import combineReducer from "./reducers/combine.reducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middlewares = [logger, thunk];

const store = createStore(
  combineReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

export default store;
