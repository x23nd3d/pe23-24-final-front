import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import classNames from "classnames";
import {
  selectCurrentItem,
  colorAction,
  photoAction,
  visitedProductsAction,
  toggleCurrentItem,
} from "../../../store/actions/product";
import { addToCart } from "../../../store/actions/cart";
import classes from "./Exposition.module.scss";
import "../../../styles/productColors.scss";
import { handleItemPreviewParams } from "../../../store/actions/shop";
import colorize from "../../../utils/colorize";
import ProductTag from "../../UI/ProductTag/ProductTag";
import { visitedProductsFunction } from "../../../store/actions/visitedProducts.actions";
import { toggleWishListHandler } from "../../../store/actions/user";
import Unavailable from "../../UI/SVGIconsComponents/Unavailable";

const ProductCard = ({
  product,
  dispatchColor,
  dispatchPhoto,
  dispatchVisitedProducts,
  dispatchCurrentWish,
  item,
  selectCurrentItemHandler,
  addToCartHandler,
  history,
  cart,
  user,
  auth,
  shop,
  handleItemPreview,
  visitedProductsHandler,
  toggleWishList,
}) => {
  const findCurrentItemByIdx = (array, currentItem) =>
    array.findIndex((current) => current.id === currentItem.id);

  const idx = findCurrentItemByIdx(shop.currentPreviewItems, item);
  const cartIdx = findCurrentItemByIdx(
    cart.items,
    shop.currentPreviewItems[idx]
  );

  const dispatchProduct = () => {
    selectCurrentItemHandler(item);
    dispatchColor(item.color[0]);
    dispatchPhoto(item.photo[item.color[0]]);
    dispatchVisitedProducts(item);
    dispatchCurrentWish({
      ...item,
      color: item.color[0],
      size: item.size ? item.size[0] : [],
    });
  };

  const clsHoverDetails = [
    classes.CartHoverDetails,
    cartIdx >= 0 ? classes.CartHoverDetailsFreeze : null,
    item.stock ? null : classes.CartHoverDetailsFreeze,
  ];

  const renderItemSizes = (currentItem) => {
    if (!currentItem) return;
    return currentItem.size.map((size) => {
      const cls = [
        classes.sizeItem,
        size === shop.currentPreviewItems[idx].size &&
        currentItem.id === shop.currentPreviewItems[idx].id &&
        cartIdx < 0
          ? classes.sizeItemActive
          : null,
        cartIdx >= 0 ? classes.freezeItem : null,
        item.stock ? null : classes.freezeItem,
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
  };

  const renderItemColors = (currentItem) => {
    if (!currentItem) return;

    return currentItem.color.map((color) => {
      const colorClass = colorize(color.trim());
      const cls = [
        classes.colorItem,
        color === shop.currentPreviewItems[idx].color &&
        currentItem.id === shop.currentPreviewItems[idx].id &&
        cartIdx < 0
          ? classes.colorItemActive
          : null,
        color ? classes[colorClass] : null,
        cartIdx >= 0 ? classes.freezeItem : null,
        item.stock ? null : classes.freezeItem,
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
  };

  const renderCartIcon = () => {
    const cls = [
      classes.cartItem,
      cartIdx >= 0 ? classes.cartItemActive : null,
    ];

    return ((typeof shop.currentPreviewItems[idx].color === "string" ||
      !shop.currentPreviewItems[idx].color) &&
      (typeof shop.currentPreviewItems[idx].size === "string" ||
        !shop.currentPreviewItems[idx].size)) ||
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

  const renderViewImage = () => {
    const currentItem = shop.currentPreviewItems[idx];
    const hasArrayImages = Array.isArray(currentItem.color);
    if (hasArrayImages) {
      return item.viewImage;
    }
    return currentItem.photo[currentItem.color][0];
  };

  const renderTags = (currentItem) => {
    const tags = [
      "new",
      "recommended",
      "out_of_stock",
      currentItem.ordered >= 120 ? "popular" : null,
    ];

    if (!currentItem.stock) {
      return (
        <ProductTag
          item={currentItem}
          tag="Not available"
          key={currentItem.name}
        />
      );
    }

    return tags.map((tag) => {
      if (currentItem[tag] === true || tag === "popular") {
        return (
          <ProductTag
            item={currentItem}
            tag={tag}
            key={currentItem.name + tag}
          />
        );
      }

      return null;
    });
  };

  const renderWishlistIcon = () => {
    if (auth.token) {
      if (user.userId.wishlist.length > 0) {
        const wishIdx = user.userId.wishlist.find(
          (current) =>
            JSON.stringify(current) ===
            JSON.stringify(shop.currentPreviewItems[idx])
        );

        if (wishIdx) {
          return <i className="fas fa-heart" />;
        }
        return <i className="far fa-heart" />;
      }
    }
    return <i className="far fa-heart" />;
  };

  return (
    <>
      <NavLink
        to={`/shop/product/${item.id}`}
        onClick={() => {
          dispatchProduct();
          visitedProductsHandler(item);
        }}
        className={classes.card}
      >
        <img
          className={classNames(
            classes.image,
            item.stock ? null : classes.imageStockOff
          )}
          src={renderViewImage()}
          alt="Product Item"
        />
        <div className={classes.boxBanner}>
          <div className={classes.info}>
            <span>{item.name}</span>
            <div className={classes.productHeader}>
              <span>{item.price} $</span>
              <div className={classes.productTags}>{renderTags(item)}</div>
            </div>
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
        {auth.token ? (
          <button
            type="button"
            className={classes.AddToWishlist}
            onClick={() => toggleWishList(shop.currentPreviewItems[idx])}
          >
            {renderWishlistIcon()}
          </button>
        ) : (
          <button
            type="button"
            className={classes.AddToWishlist}
            onClick={() => history.push("/login")}
          >
            {renderWishlistIcon()}
          </button>
        )}

        {item.stock ? renderCartIcon() : <Unavailable />}
      </div>
    </>
  );
};

ProductCard.defaultProps = {
  selectCurrentItemHandler: (f) => f,
  addToCartHandler: (f) => f,
  handleItemPreview: (f) => f,
  visitedProductsHandler: (f) => f,
  shop: {},
  cart: {},
  user: {},
  auth: {},
};

ProductCard.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  selectCurrentItemHandler: PropTypes.func,
  addToCartHandler: PropTypes.func,
  handleItemPreview: PropTypes.func,
  shop: PropTypes.instanceOf(Object),
  cart: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  auth: PropTypes.instanceOf(Object),
  product: PropTypes.instanceOf(Object).isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
  dispatchCurrentWish: PropTypes.func.isRequired,
  toggleWishList: PropTypes.func.isRequired,
  visitedProductsHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    product: state.product,
    shop: state.shop,
    cart: state.cart,
    user: state.user,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchCurrentWish: (value) => dispatch(toggleCurrentItem(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
    selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
    addToCartHandler: (item) => dispatch(addToCart(item)),
    handleItemPreview: (item, param, value) =>
      dispatch(handleItemPreviewParams(item, param, value)),
    visitedProductsHandler: (product) =>
      dispatch(visitedProductsFunction(product)),
    toggleWishList: (item) => dispatch(toggleWishListHandler(item)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductCard));
