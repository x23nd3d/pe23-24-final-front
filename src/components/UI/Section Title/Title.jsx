import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {title, pos} from "./Title.module.scss";

const Title = ({text, position}) => (
    <header className={classNames(title, position && pos)}>
            <p>{text}</p>
    </header>
);

Title.defaultProps = { position: false }

Title.propTypes = {
    text: PropTypes.string.isRequired,
    position: PropTypes.bool
}

export default Title;