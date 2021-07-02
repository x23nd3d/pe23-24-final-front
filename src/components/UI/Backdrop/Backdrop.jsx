import React from "react";
import PropTypes from "prop-types";
import classes from "./Backdrop.module.scss";

const Backdrop = ({ toggle }) => (
  <div role="none" onClick={() => toggle(false)} className={classes.Backdrop} />
);

Backdrop.defaultProps = {
  toggle: (f) => f,
};

Backdrop.propTypes = {
  toggle: PropTypes.func,
};

export default Backdrop;
