import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = ({ userFunction, customStyle, label }) => {
  const cls = [classes.Buttons, customStyle || null];
  return (
    <button type="button" onClick={userFunction} className={cls.join(" ")}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  label: {},
  userFunction: () => {},
  customStyle: "",
};

Button.propTypes = {
  label: PropTypes.bool,
  userFunction: PropTypes.func,
  customStyle: PropTypes.string,
};
export default Button;
