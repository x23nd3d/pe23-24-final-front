import React from "react";
import "./App.module.scss";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/Main Page/MainPage";
import Shop from "./components/Shop/Shop";
import ShopLayout from "./hoc/ShopLayout/ShopLayout";
import Product from "./components/Product/Product";
import LoginRegistration from "./components/LoginRegistration/LoginRegistration";
import {dataSample} from "./utils/dataSample";

function App() {
  const routes = (
    <Switch>
      <Route path="/shop">
        <ShopLayout>
          <Shop />
        </ShopLayout>
      </Route>
      <Route exact path="/login">
        <LoginRegistration />
      </Route>
      <Route path="/product">
        <Product data={dataSample} />
      </Route>
      <Route path="/" component={MainPage} />
    </Switch>
  );

  return routes;
}

export default App;
