import React from "react";
import PropTypes from "prop-types";
import {box} from "./HoverBox.module.scss";

const HoverBox = ({title, price}) => (
    <div className={box}>
        
    </div>
);

HoverBox.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}

export default HoverBox;