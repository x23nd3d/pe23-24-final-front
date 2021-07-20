import React from "react";
import PropTypes from "prop-types";
// import classNames from "classnames";
import { card, boxBanner, image } from "./Exposition.module.scss";
// import useHover from "../../../hooks/useHover";

const ProductCard = ({ product }) => (
  <div id={product.id} className={card}>
    <img className={image} src={product.viewImage} alt="Product Item" />
    <div className={boxBanner}>
      <span>{product.name}</span>
      <span>{product.price} $</span>
    </div>
  </div>
);

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProductCard;
