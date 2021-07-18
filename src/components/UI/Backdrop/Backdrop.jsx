import React from "react";
import PropTypes from "prop-types";
import classes from "./Backdrop.module.scss";

const Backdrop = ({ toggle, isDark }) => {
  const cls = [classes.Backdrop, isDark ? classes.Dark : null];

  return (
    <div role="none" onClick={() => toggle(false)} className={cls.join(" ")} />
  );
};

Backdrop.defaultProps = {
  toggle: (f) => f,
  isDark: "",
};

Backdrop.propTypes = {
  toggle: PropTypes.func,
  isDark: PropTypes.string,
};

export default Backdrop;
