import React from "react";
import PropTypes from "prop-types";
import {tbButton} from "./TranslucentBoxButton.module.scss";

const TranslucentBoxButton = ({text}) => (
    <button data-testid="TranslucentBoxButtonTestId" type="button" className={tbButton}>{text}</button>
);

TranslucentBoxButton.defaultProps = {
    text: ""
}

TranslucentBoxButton.propTypes = {
    text: PropTypes.string,
}

export default TranslucentBoxButton;