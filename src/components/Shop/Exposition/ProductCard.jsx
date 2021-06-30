import React, { useRef } from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import {card, boxBanner} from "./Exposition.module.scss";
// import useHover from "../../../hooks/useHover";

const ProductCard = ({product}) => (
    <div id={product.id} className={card}>
        <div className={boxBanner}>
            <span>{product.name}</span>
            <span>{product.price}</span>
        </div>
    </div>
);

ProductCard.propTypes = {
    product: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default ProductCard;