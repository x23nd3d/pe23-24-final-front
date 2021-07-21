import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.module.scss";
import { AnimatePresence } from "framer-motion";
import MainPage from "./components/Main Page/MainPage";
import Shop from "./components/Shop/Shop";
import ShopLayout from "./hoc/ShopLayout/ShopLayout";
import ProductContainer from "./components/Product/ProductContainer";
import LoginRegistration from "./components/LoginRegistration/LoginRegistration";
import { logout } from "./store/actions/auth";
import Logout from "./components/Logout/Logout";

function App({ isAuthenticated }) {
  let routes = (
    <Switch>
      <Route path="/shop/product/:id">
        <ProductContainer />
      </Route>
      <Route path="/shop">
        <ShopLayout>
          <Shop />
        </ShopLayout>
      </Route>
      <Route exact path="/login">
        <AnimatePresence>
          <LoginRegistration />
        </AnimatePresence>
      </Route>
      <Route path="/" component={MainPage} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/shop/product/:id">
          <ProductContainer />
        </Route>
        <Route path="/shop">
          <ShopLayout>
            <Shop />
          </ShopLayout>
        </Route>
        <Route exact path="/logout" component={Logout} />

        <Route path="/" component={MainPage} />
      </Switch>
    );
  }

  return routes;
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    user: state.user.userId,
    loading: state.auth.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
