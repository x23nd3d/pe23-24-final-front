import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./ShopLayout.module.scss";
import { receiveCurrentRoute } from "../../store/actions/shop";
import {
  filterItemsFunction,
  sidebarDefaultHandler,
} from "../../store/actions/sidebar";

const ShopLayout = ({
  children,
  history,
  receiveRoute,
  shop,
  setSidebarDefaultHandler,
  filterItemsHandler,
  sidebar,
}) => {
  useEffect(() => {
    if (history.location.search === "?category=all&type=all") {
      receiveRoute(`${history.location.search}`);
      setSidebarDefaultHandler();
    }
  }, [history.location.search, receiveRoute, setSidebarDefaultHandler]);

  // useEffect(() => {
  //   filterItemsHandler(shop.currentItems);
  // }, [
  //   filterItemsHandler,
  //   shop.currentItems,
  //   sidebar.chosenColors,
  //   sidebar.chosenPriceRange,
  // ]);

  return <div className={classes.ShopLayout}>{children}</div>;
};

ShopLayout.defaultProps = {
  receiveRoute: (f) => f,
  setSidebarDefaultHandler: (f) => f,
  history: {},
  shop: {},
  sidebar: {},
  filterItemsHandler: (f) => f,
};

ShopLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  receiveRoute: PropTypes.func,
  setSidebarDefaultHandler: PropTypes.func,
  history: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  sidebar: PropTypes.instanceOf(Object),
  filterItemsHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
    sidebar: state.sidebar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
    setSidebarDefaultHandler: () => dispatch(sidebarDefaultHandler()),
    filterItemsHandler: (items) => dispatch(filterItemsFunction(items)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShopLayout));
