import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { selectCurrentItem } from "../../../store/actions/product";
import { addToCart } from "../../../store/actions/cart";
import {
  card,
  boxBanner,
  image,
  info,
  cartItem,
  CartHoverDetails,
  itemMoreDetails,
  sizeItem,
  sizeItemActive,
  colorItem,
  colorItemActive,
  sizes,
  colors,
} from "./Exposition.module.scss";
import { handleItemPreviewParams } from "../../../store/actions/shop";

const ProductCard = ({
  item,
  selectCurrentItemHandler,
  addToCartHandler,
  history,
  shop,
  handleItemPreview,
}) => {
  const renderItemSizes = (currentItem) => {
    const idx = shop.currentPreviewItems.findIndex(
      (current) => current.id === currentItem.id
    );
    return currentItem.size.map((size) => {
      const cls = [
        sizeItem,
        size === shop.currentPreviewItems[idx].size &&
        currentItem.id === shop.currentPreviewItems[idx].id
          ? sizeItemActive
          : null,
      ];
      return (
        <button
          key={size}
          type="button"
          className={cls.join(" ")}
          onClick={() => handleItemPreview(item, "size", size)}
        >
          {size}
        </button>
      );
    });
  };

  // TODO: Add class archive to check which color is currently here
  const renderItemColors = (currentItem) => {
    const idx = shop.currentPreviewItems.findIndex(
      (current) => current.id === currentItem.id
    );
    return currentItem.color.map((color) => {
      const cls = [
        colorItem,
        color === shop.currentPreviewItems[idx].color &&
        currentItem.id === shop.currentPreviewItems[idx].id
          ? colorItemActive
          : null,
      ];

      return (
        <button
          key={color}
          type="button"
          className={cls.join(" ")}
          onClick={() => handleItemPreview(item, "color", color)}
        >
          <span>{color}</span>
        </button>
      );
    });
  };
  // shop.currentPreviewItems[item.id]
  return (
    <>
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
        </div>
      </NavLink>
      <div className={CartHoverDetails}>
        <div className={itemMoreDetails}>
          {item.color ? (
            <div className={colors}>{renderItemColors(item)}</div>
          ) : null}
          {item.size ? (
            <div className={sizes}>{renderItemSizes(item)}</div>
          ) : null}
        </div>
        {item.color.length < 1 ||
        !item.color ||
        item.size.length < 1 ||
        !item.size ? (
          <div
            role="none"
            className={cartItem}
            onClick={() => addToCartHandler(item)}
          >
            <i className="far fa-shopping-cart" />
          </div>
        ) : null}
      </div>
    </>
  );
};

ProductCard.defaultProps = {
  selectCurrentItemHandler: (f) => f,
  addToCartHandler: (f) => f,
  handleItemPreview: (f) => f,
  shop: {},
};

ProductCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  selectCurrentItemHandler: PropTypes.func,
  addToCartHandler: PropTypes.func,
  handleItemPreview: PropTypes.func,
  shop: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    product: state.product,
    shop: state.shop,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
    addToCartHandler: (item) => dispatch(addToCart(item)),
    handleItemPreview: (item, param, value) =>
      dispatch(handleItemPreviewParams(item, param, value)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductCard));
