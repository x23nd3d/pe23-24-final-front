import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/actions/auth";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
