import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import classes from "./FilterButton.module.scss";

const FilterButton = ({ propsClasses, children, reset, onclick }) => (
  <button
    className={classNames(
      classes.FilterButton,
      reset && classes.FilterButtonReset,
      propsClasses
    )}
    type="button"
    onClick={() => onclick()}
  >
    {children}
  </button>
);

FilterButton.defaultProps = {
  children: "Click Me",
  propsClasses: "",
  reset: false,
  onclick: (f) => f,
};

FilterButton.propTypes = {
  children: PropTypes.instanceOf(Array),
  propsClasses: PropTypes.string,
  reset: PropTypes.bool,
  onclick: PropTypes.func,
};

export default FilterButton;
