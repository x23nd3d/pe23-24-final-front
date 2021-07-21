import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./ShopLayout.module.scss";
import { receiveCurrentRoute } from "../../store/actions/shop";
import { sidebarDefaultHandler } from "../../store/actions/sidebar";

const ShopLayout = ({
  children,
  history,
  receiveRoute,
  shop,
  setSidebarDefaultHandler,
}) => {
  useEffect(() => {
    if (history.location.search === "?category=all&type=all") {
      receiveRoute(`/shop/${history.location.search}`);
      setSidebarDefaultHandler();
    }
  }, [history.location.search, receiveRoute, setSidebarDefaultHandler]);

  const mapped = shop.test.map((item) => item);
  console.log("MAPPED: ", mapped);

  return mapped.length ? (
    <div className={classes.ShopLayout}>{children}</div>
  ) : null;
};

ShopLayout.defaultProps = {
  receiveRoute: (f) => f,
  setSidebarDefaultHandler: (f) => f,
  history: {},
  shop: {},
};

ShopLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  receiveRoute: PropTypes.func,
  setSidebarDefaultHandler: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
    setSidebarDefaultHandler: () => dispatch(sidebarDefaultHandler()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShopLayout));
