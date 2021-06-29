import React from "react";
import "./App.module.scss";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/Main Page/MainPage";
import Shop from "./components/Shop/Shop";

function App() {
  const routes = (
    <Switch>
      <Route path="/shop" component={Shop} />
      <Route path="/" component={MainPage} />
    </Switch>
  );

  return routes;
}

export default App;
