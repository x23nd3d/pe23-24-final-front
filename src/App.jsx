import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.scss";
import { AnimatePresence } from "framer-motion";
import MainPage from "./components/Main Page/MainPage";
import Shop from "./components/Shop/Shop";
import ShopLayout from "./hoc/ShopLayout/ShopLayout";
import Product from "./components/Product/Product";
import LoginRegistration from "./components/LoginRegistration/LoginRegistration";
import { logout } from "./store/actions/auth";
import Logout from "./components/Logout/Logout";
import Cart from "./components/Cart/Cart";
import Spinner from "./components/UI/Spinner/Spinner";

function App({ isAuthenticated, product }) {
  let routes = (
    <Switch>
      <Route path="/shop/product/:id">
        {product.loading ? <Spinner /> : <Product data={product.currentItem} />}
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

      <Route path="/cart" component={Cart} />

      <Route path="/" component={MainPage} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/shop/product/:id">
          {product.loading ? (
            <Spinner />
          ) : (
            <Product data={product.currentItem} />
          )}
        </Route>
        <Route path="/shop">
          <ShopLayout>
            <Shop />
          </ShopLayout>
        </Route>
        <Route exact path="/logout" component={Logout} />

        <Route path="/cart" component={Cart} />

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
    product: state.product,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
