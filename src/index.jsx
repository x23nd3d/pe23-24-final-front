import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/_reset.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { autoLogin } from "./store/actions/auth";
import { persistor, store } from "./store/store";
import App from "./App";
import Layout from "./hoc/Layout/Layout";

const app = (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

persistor.subscribe(() => {
  const { token } = store.getState().auth;
  if (token) {
    store.dispatch(autoLogin());
  }
});
ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);