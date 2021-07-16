import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classes from "./ShopLayout.module.scss";
import { receiveCurrentRoute } from "../../store/actions/shop";
import { setSidebarDefault } from "../../store/actions/sidebar";

const ShopLayout = ({
  children,
  history,
  receiveRoute,
  shop,
  setSidebarDefaultHandler,
}) => {
  const getRouteOnce = useCallback(() => {
    if (
      !shop.currentItems.length ||
      history.location.search === "?category=all&type=all"
    ) {
      receiveRoute(`/shop/${history.location.search}`);
    }
  }, [history.location.search, receiveRoute, shop.currentItems.length]);

  const checkAllRoute = useCallback(() => {
    if (history.location.search === "?category=all&type=all") {
      console.log(
        "DEFAULLLLLLTTTTTTTTTTTTTTTTTTTTTTTT",
        history.location.search
      );
      setSidebarDefaultHandler();
    }
  }, [history.location.search, setSidebarDefaultHandler]);

  useEffect(() => {
    getRouteOnce();
    checkAllRoute();
  }, [checkAllRoute, getRouteOnce]);

  return <div className={classes.ShopLayout}>{children}</div>;
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
    setSidebarDefaultHandler: () => dispatch(setSidebarDefault()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShopLayout));
