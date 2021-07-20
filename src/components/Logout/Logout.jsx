import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/actions/auth";
import { setShopDefault } from "../../store/actions/shop";
import { sidebarDefaultHandler } from "../../store/actions/sidebar";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    props.setShopDefault();
    props.sidebarDefault();
  });

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  setShopDefault: PropTypes.func.isRequired,
  sidebarDefault: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    setShopDefault: () => dispatch(setShopDefault()),
    sidebarDefault: () => dispatch(sidebarDefaultHandler()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
