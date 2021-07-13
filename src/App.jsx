import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.module.scss";
import { AnimatePresence } from "framer-motion";
import MainPage from "./components/Main Page/MainPage";
import Shop from "./components/Shop/Shop";
import ShopLayout from "./hoc/ShopLayout/ShopLayout";
import Product from "./components/Product/Product";
import LoginRegistration from "./components/LoginRegistration/LoginRegistration";
import { logout } from "./store/actions/auth";
import Logout from "./components/Logout/Logout";

const testData = {
  id: "1701",
  name: "Canali",
  caption: "Siena Suit - Classic Fit",
  category: "Suit",
  type: "Classic",
  photo: {
    Navy: [
      "./suits/1701/navy_color/canali_navy1.png",
      "./suits/1701/navy_color/canali_navy2.png",
      "./suits/1701/navy_color/canali_navy3.png",
    ],
    Black: [
      "./suits/1701/black_color/canali_black1.png",
      "./suits/1701/black_color/canali_black2.png",
      "./suits/1701/black_color/canali_black3.png",
    ],
    Charcoal: [
      "./suits/1701/charcoal_color/canali_charcoal1.png",
      "./suits/1701/charcoal_color/canali_charcoal2.png",
      "./suits/1701/charcoal_color/canali_charcoal3.png",
    ],
  },
  color: ["Navy", "Black", "Charcoal"],
  material: "Wool",
  price: "2099",
  size: ["38", "40", "42", "44", "48"],
  producingCountry: "Italy",
  description: [
    "Jacket: notch lapel, two-button front, chest pocket, flap hand pockets, non-functional four-button cuffs, double back vents",
    "Trousers: slide and two-button closure with zip fly, hand pockets, back button pockets, flat front, creased",
    "Family-run since 1934, Canali’s tailored designs are handcrafted with premium fabrics and a meticulous attention to detail.",
  ],
  stock: true,
};

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
        <Product data={testData} />
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
        <Route path="/product">
          <Product data={testData} />
        </Route>
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
