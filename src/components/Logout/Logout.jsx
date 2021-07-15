import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/actions/auth";
import { resetSidebar } from "../../store/actions/sidebar";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
    console.log("PROPSSS:", props);
    props.resetSidebarHandler();
  });

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  resetSidebarHandler: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    resetSidebarHandler: () => dispatch(resetSidebar()),
  };
}

export default connect(null, mapDispatchToProps)(Logout);
