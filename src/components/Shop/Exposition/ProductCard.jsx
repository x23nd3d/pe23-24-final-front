import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { card, boxBanner, image } from "./Exposition.module.scss";

const ProductCard = ({ product }) => (
  <NavLink to={`/shop/product/${product.id}`} className={card}>
    <img className={image} src={product.viewImage} alt="Product Item" />
    <div className={boxBanner}>
      <span>{product.name}</span>
      <span>{product.price} $</span>
    </div>
  </NavLink>
);

ProductCard.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default ProductCard;
