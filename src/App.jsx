import React from "react";
import "./App.module.scss";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/Main Page/MainPage";
import Shop from "./components/Shop/Shop";

function App() {
  const routes = (
    <Switch>
      <Route path="/" component={MainPage} />
      <Route path="/shop" component={Shop} />
    </Switch>
  );

  return routes;
}

export default App;
