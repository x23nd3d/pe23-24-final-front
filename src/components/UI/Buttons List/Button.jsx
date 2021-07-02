import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.scss";

const Button = ({userFunction, userStyle, label}) => (
    <button type="button" onClick={userFunction} style={userStyle} className={classes.Buttons}>
        {label}
    </button>
)

Button.defaultProps = {
    label: {},
    userFunction: () => {},
    userStyle: {},
};
   
Button.propTypes = {
    label: PropTypes.bool,
    userFunction: PropTypes.func,
    userStyle: PropTypes.bool,
}
export default Button;
   