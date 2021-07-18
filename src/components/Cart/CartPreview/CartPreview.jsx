import React from "react";
import PropTypes from "prop-types";
import classes from "./CartPreview.module.scss";

const CartPreview = ({ items }) => <div className={classes.CartPreview} />;

CartPreview.propTypes = {
  items: PropTypes.instanceOf(Object).isRequired,
};

export default CartPreview;
