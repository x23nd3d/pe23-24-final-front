import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { selectCurrentItem } from "../../../store/actions/product";
import { addToCart } from "../../../store/actions/cart";
import {
  card,
  boxBanner,
  image,
  info,
  cartItem,
} from "./Exposition.module.scss";

const ProductCard = ({
  item,
  selectCurrentItemHandler,
  addToCartHandler,
  history,
}) => (
  <NavLink
    to={`/shop/product/${item.id}`}
    onClick={() => selectCurrentItemHandler(item)}
    className={card}
  >
    <img className={image} src={item.viewImage} alt="Product Item" />
    <div className={boxBanner}>
      <div className={info}>
        <span>{item.name}</span>
        <span>{item.price} $</span>
      </div>
      <div
        role="none"
        className={cartItem}
        onClick={() => addToCartHandler(item)}
      >
        <i className="far fa-shopping-cart" />
      </div>
    </div>
  </NavLink>
);

ProductCard.defaultProps = {
  selectCurrentItemHandler: (f) => f,
  addToCartHandler: (f) => f,
};

ProductCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  selectCurrentItemHandler: PropTypes.func,
  addToCartHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    product: state.product,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
    addToCartHandler: (item) => dispatch(addToCart(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductCard));
