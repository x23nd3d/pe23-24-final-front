import React, { useRef } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import {card} from "./Exposition.module.scss";
import useHover from "../../../hooks/useHover";
import HoverBox from "../../UI/Hover Box/HoverBox";

const ProductCard = ({name}) => {
    const ref = useRef();
    const hovered = useHover(ref);

    return (

        <li ref={ref} className={card}>
            <HoverBox title="text" price="10" />
        </li>
    );
}

ProductCard.propTypes = {
    name: PropTypes.string.isRequired
}

export default ProductCard;