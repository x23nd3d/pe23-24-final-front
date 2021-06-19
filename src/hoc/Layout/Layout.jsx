import React from "react";
import PropTypes from "prop-types";
import classes from "./Layout.module.scss";

const Layout = ({ children }) => (
  <div className={classes.Layout}>{children}</div>
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
