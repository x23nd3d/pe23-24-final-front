import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = ({ type, title }) => (
  <button className={classes.Button} type={type}>
    {title}
  </button>
);

Button.defaultProps = {
  type: "button",
  title: "",
};

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};

export default Button;
