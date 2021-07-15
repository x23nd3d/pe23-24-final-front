import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.module.scss";
import { AnimatePresence } from "framer-motion";
import MainPage from "./components/Main Page/MainPage";
import Shop from "./components/Shop/Shop";
import ShopLayout from "./hoc/ShopLayout/ShopLayout";
import Product from "./components/Product/Product";
import LoginRegistration from "./components/LoginRegistration/LoginRegistration";
<<<<<<< HEAD
import dataSample from "./utils/dataSample";
=======
import {dataSample} from "./utils/dataSample";
import { logout } from "./store/actions/auth";
import Logout from "./components/Logout/Logout";
>>>>>>> 04ef52eca56a89ebe5197452a97285d686cc2779

function App({ isAuthenticated }) {
  let routes = (
    <Switch>
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
      <Route path="/product">
        <Product data={dataSample} />
      </Route>
      <Route path="/" component={MainPage} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
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
