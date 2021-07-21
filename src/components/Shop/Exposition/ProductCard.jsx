import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { card, boxBanner, image } from "./Exposition.module.scss";
import { colorAction, photoAction, visitedProductsAction } from "../../../store/actions/product";

const ProductCard = ({ product, dispatchColor, dispatchPhoto, dispatchVisitedProducts }) => {
  const dispatchProduct = () => {
    dispatchColor(product.color[0]);
    dispatchPhoto(product.photo[product.color[0]]);
    dispatchVisitedProducts(product);
  }
  return (
  <NavLink onClick={dispatchProduct} to={`/shop/product/${product.id}`} className={card}>
    <img className={image} src={product.viewImage} alt="Product Item" />
    <div className={boxBanner}>
      <span>{product.name}</span>
      <span>{product.price} $</span>
    </div>
  </NavLink>
 )
}

ProductCard.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
};


function mapDispatchToProps (dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
  }
}

export default connect(null, mapDispatchToProps)(ProductCard);
