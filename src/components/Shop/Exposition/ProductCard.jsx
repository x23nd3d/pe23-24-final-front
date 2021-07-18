import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCurrentItem } from "../../../store/actions/product";
import { card, boxBanner, image } from "./Exposition.module.scss";

const ProductCard = ({ item, selectCurrentItemHandler }) => (
  <NavLink
    to={`/shop/product/${item.id}`}
    onClick={() => selectCurrentItemHandler(item)}
    className={card}
  >
    <img className={image} src={item.viewImage} alt="Product Item" />
    <div className={boxBanner}>
      <span>{item.name}</span>
      <span>{item.price} $</span>
    </div>
  </NavLink>
);

ProductCard.defaultProps = {
  selectCurrentItemHandler: (f) => f,
};

ProductCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  selectCurrentItemHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    product: state.product,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
