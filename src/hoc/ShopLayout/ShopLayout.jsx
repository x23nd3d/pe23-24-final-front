import React from "react";
import PropTypes from "prop-types";
import classes from "./ShopLayout.module.scss";

const ShopLayout = ({ children }) => (
  <div className={classes.ShopLayout}>{children}</div>
);

ShopLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default ShopLayout;
