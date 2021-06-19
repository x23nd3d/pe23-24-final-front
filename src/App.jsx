import React from "react";
import "./App.module.scss";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/Main Page/MainPage";

function App() {
  const routes = (
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  );

  return routes;
}

export default App;
