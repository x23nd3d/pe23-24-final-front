import React from "react";
import PropTypes from "prop-types";
import classes from "./Backdrop.module.scss";

const Backdrop = ({ toggle, isDark, isSuperDark }) => {
  const cls = [
    classes.Backdrop,
    isDark ? classes.Dark : null,
    isSuperDark ? classes.SuperDark : null,
  ];

  return (
    <div data-testid="BackdropTestId" role="none" onClick={() => toggle(false)} className={cls.join(" ")} />
  );
};

Backdrop.defaultProps = {
  toggle: (f) => f,
  isDark: "",
  isSuperDark: "",
};

Backdrop.propTypes = {
  toggle: PropTypes.func,
  isDark: PropTypes.string,
  isSuperDark: PropTypes.string,
};

export default Backdrop;
