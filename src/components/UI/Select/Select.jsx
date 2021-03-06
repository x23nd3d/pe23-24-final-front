import React from "react";
import PropTypes from "prop-types";
import classes from "./Select.module.scss";

const Select = ({arrValues}) => (
  <select data-testid="SelectTestId" className={classes.Select}>
      {arrValues.map(value =>(
          <option>
              {value}
          </option>
      ))}
  </select>
);

Select.defaultProps = {
 arrValues: []
};

Select.propTypes = {
  arrValues: PropTypes.arrayOf(PropTypes.string)
};

export default Select;
