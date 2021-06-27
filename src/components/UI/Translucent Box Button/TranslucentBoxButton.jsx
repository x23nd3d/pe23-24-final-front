import React from "react";
import PropTypes from "prop-types";
import {tbButton} from "./TranslucentBoxButton.module.scss";

const TranslucentBoxButton = ({text}) => (
    <button type="button" className={tbButton}>{text}</button>
);

TranslucentBoxButton.propTypes = {
    text: PropTypes.string.isRequired,
}

export default TranslucentBoxButton;