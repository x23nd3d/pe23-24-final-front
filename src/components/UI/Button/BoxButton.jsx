import React from "react";
import "../ui-styles.scss";
import PropTypes from "prop-types";

const BoxButton = ({text}) => (
    <button type="button" className="box-button">{text}</button>
);

BoxButton.propTypes = {
    text: PropTypes.string.isRequired,
}

export default BoxButton;