import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { selectCurrentItem } from "../../../store/actions/product";
import { addToCart } from "../../../store/actions/cart";
import classes from "./Exposition.module.scss";
import "../../../styles/productColors.scss";
import { handleItemPreviewParams } from "../../../store/actions/shop";
import colorize from "../../../utils/colorize";

const ProductCard = ({
  item,
  selectCurrentItemHandler,
  addToCartHandler,
  history,
  cart,
  shop,
  handleItemPreview,
}) => {
  const findCurrentItemByIdx = (array, currentItem) =>
    array.findIndex((current) => current.id === currentItem.id);

  const idx = findCurrentItemByIdx(shop.currentPreviewItems, item);
  const cartIdx = findCurrentItemByIdx(
    cart.items,
    shop.currentPreviewItems[idx]
  );
  const clsHoverDetails = [
    classes.CartHoverDetails,
    cartIdx >= 0 ? classes.CartHoverDetailsFreeze : null,
  ];

  const renderItemSizes = (currentItem) =>
    currentItem.size.map((size) => {
      const cls = [
        classes.sizeItem,
        size === shop.currentPreviewItems[idx].size &&
        currentItem.id === shop.currentPreviewItems[idx].id
          ? classes.sizeItemActive
          : null,
        cartIdx >= 0 ? classes.freezeItem : null,
        cartIdx >= 0 && size === cart.items[cartIdx].size
          ? classes.sizeItemActive
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

  const renderItemColors = (currentItem) =>
    currentItem.color.map((color) => {
      const colorClass = colorize(color.trim());
      const cls = [
        classes.colorItem,
        color === shop.currentPreviewItems[idx].color &&
        currentItem.id === shop.currentPreviewItems[idx].id
          ? classes.colorItemActive
          : null,
        color ? classes[colorClass] : null,
        cartIdx >= 0 ? classes.freezeItem : null,
        cartIdx >= 0 && color === cart.items[cartIdx].color
          ? classes.colorItemActive
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

  const renderCartIcon = () => {
    const cls = [
      classes.cartItem,
      cartIdx >= 0 ? classes.cartItemActive : null,
    ];

    return ((typeof shop.currentPreviewItems[idx].color === "string" ||
      !shop.currentPreviewItems[idx].color.length) &&
      (typeof shop.currentPreviewItems[idx].size === "string" ||
        !shop.currentPreviewItems[idx].size.length)) ||
      cartIdx >= 0 ? (
      <div
        role="none"
        className={cls.join(" ")}
        onClick={() => addToCartHandler(shop.currentPreviewItems[idx])}
      >
        {cartIdx >= 0 ? (
          <i className="far fa-cart-plus" />
        ) : (
          <i className="far fa-shopping-cart" />
        )}
      </div>
    ) : null;
  };

  return (
    <>
      <NavLink
        to={`/shop/product/${item.id}`}
        onClick={() => selectCurrentItemHandler(item)}
        className={classes.card}
      >
        <img
          className={classes.image}
          src={item.viewImage}
          alt="Product Item"
        />
        <div className={classes.boxBanner}>
          <div className={classes.info}>
            <span>{item.name}</span>
            <span>{item.price} $</span>
          </div>
        </div>
      </NavLink>
      <div className={clsHoverDetails.join(" ")}>
        <div className={classes.itemMoreDetails}>
          {item.color ? (
            <div className={classes.colors}>{renderItemColors(item)}</div>
          ) : null}
          {item.size ? (
            <div className={classes.sizes}>{renderItemSizes(item)}</div>
          ) : null}
        </div>
        <div className={classes.AddToWishlist}>
          <i className="far fa-heart" />
        </div>

        {renderCartIcon()}
      </div>
    </>
  );
};

ProductCard.defaultProps = {
  selectCurrentItemHandler: (f) => f,
  addToCartHandler: (f) => f,
  handleItemPreview: (f) => f,
  shop: {},
  cart: {},
};

ProductCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  selectCurrentItemHandler: PropTypes.func,
  addToCartHandler: PropTypes.func,
  handleItemPreview: PropTypes.func,
  shop: PropTypes.instanceOf(Object),
  cart: PropTypes.instanceOf(Object),
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
