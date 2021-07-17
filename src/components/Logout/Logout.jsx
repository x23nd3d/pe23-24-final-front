import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/actions/auth";
import { setShopDefault } from "../../store/actions/shop";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    props.setShopDefault();
  });

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  setShopDefault: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    setShopDefault: () => dispatch(setShopDefault()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
