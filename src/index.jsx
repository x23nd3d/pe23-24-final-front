import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/_reset.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./store/store";
import store from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Layout from "./hoc/Layout/Layout";

const app = (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);

// persistor.subscribe(() => {
//   const token = store.getState().auth.token;
//   if (token) {
//     store.dispatch(autoLogin());
//   }
// });

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
