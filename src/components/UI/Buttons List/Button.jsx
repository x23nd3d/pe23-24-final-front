import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = ({ userFunction, customStyle, label, submit }) => {
  const cls = [classes.Buttons, customStyle || null];
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={userFunction}
      className={cls.join(" ")}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  label: "",
  userFunction: (f) => f,
  customStyle: "",
};

Button.propTypes = {
  label: PropTypes.string,
  submit: PropTypes.string.isRequired,
  userFunction: PropTypes.func,
  customStyle: PropTypes.string,
};
export default Button;
