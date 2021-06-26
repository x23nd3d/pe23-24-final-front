import React from "react";
import PropTypes from "prop-types";
import {title} from "./Title.module.scss";

const Title = ({text}) => (
    <header className={title}>
            <p>{text}</p>
    </header>
);

Title.propTypes = {
    text: PropTypes.string.isRequired
}

export default Title;