import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  decreaseItemCount,
  increaseItemCount,
  removeFromCart,
  setItemCountHandler,
} from "../../../../store/actions/cart";
import {
  colorAction,
  photoAction,
  selectCurrentItem,
  sendProductRequest,
  visitedProductsAction,
} from "../../../../store/actions/product";
import classes from "./CartItem.module.scss";
import colorize from "../../../../utils/colorize";
import pushNotification from "../../../../utils/toastrConfig";

const CartItem = ({
  item,
  shop,
  cart,
  product,
  increaseCount,
  decreaseCount,
  removeFromCartHandler,
  selectCurrentItemHandler,
  setItemCount,
  dispatchColor,
  dispatchPhoto,
  dispatchVisitedProducts,
  sendProductRequestHandler,
}) => {
  const decreaseCountHandler = (currentItem) => {
    if (currentItem.count === 1) {
      return;
    }
    decreaseCount(currentItem);
  };

  const increaseCountHandler = (currentItem) => {
    if (currentItem.count === currentItem.left) {
      return pushNotification(
        "warning",
        "Seems we do not have more items in stock",
        "We are sorry",
        {
          toastClass: "toastr-c-warning",
        }
      );
    }
    increaseCount(currentItem);
  };
  const decreaseCountCls = [
    item.count === 1 ? classes.CartCountDecreaseOff : null,
  ];

  const increaseCountCls = [
    item.count === item.left ? classes.CartCountIncreaseOff : null,
  ];
  const colorClass = colorize(item.color.trim());

  const dispatchProduct = async () => {
    await sendProductRequestHandler(item.id);
    dispatchVisitedProducts(item);
  };

  const renderViewImage = () => {
    const itemInCart = cart.items.find((current) => current === item);
    const hasArrayImages = Array.isArray(itemInCart.color);
    if (hasArrayImages) {
      return item.viewImage;
    }
    return itemInCart.photo[itemInCart.color][0];
  };

  const setItemCountBlur = (current, value) => {
    if (value > current.left) {
      pushNotification(
        "warning",
        "Seems we do not have more items in stock",
        "We are sorry",
        {
          toastClass: "toastr-c-warning",
        }
      );
      return setItemCount(current, value);
    }

    return setItemCount(current, value);
  };

  return (
    <div className={classes.CartItem} key={item.title}>
      <div className={classes.CartItemImage}>
        <img src={renderViewImage()} alt="Cart Item" />
      </div>
      <div className={classes.CartItemGeneral}>
        <NavLink to={`/shop/product/${item.id}`} onClick={dispatchProduct}>
          <p>{item.description.join(" ")}</p>
        </NavLink>

        <div className={classes.CartManage}>
          <div className={classes.CartCountContainer}>
            <button
              type="button"
              className={decreaseCountCls.join(" ")}
              onClick={() => decreaseCountHandler(item)}
            >
              <i className="far fa-minus" />
            </button>
            <input
              className={classes.CartCountDetails}
              defaultValue={item.count === 0 ? 1 : item.count}
              onBlur={(e) => setItemCountBlur(item, Number(e.target.value))}
            />
            <button
              type="button"
              onClick={() => increaseCountHandler(item)}
              className={increaseCountCls.join(" ")}
            >
              <i className="far fa-plus" />
            </button>
          </div>
          <div className={classes.CartItemMoreDetails}>
            <div className={classes.CartItemDetails}>
              {item.size ? (
                <div
                  className={`${classes.sizeItem} ${classes.sizeItemActive} ${classes.sizeItemActiveCart}`}
                >
                  <p>{item.size}</p>
                </div>
              ) : null}
              {item.color ? (
                <div className={classes.CartColor}>
                  <div
                    className={`${classes.colorItem} ${classes[colorClass]}`}
                  />{" "}
                  <p> {item.color}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.Manage}>
        <button
          type="button"
          className={classes.CartItemRemove}
          onClick={() => removeFromCartHandler(item)}
        >
          <i className="far fa-trash-alt" />
        </button>
      </div>
    </div>
  );
};

CartItem.defaultProps = {
  cart: {},
  shop: {},
  product: {},
  increaseCount: (f) => f,
  decreaseCount: (f) => f,
  removeFromCartHandler: (f) => f,
  setItemCount: (f) => f,
  selectCurrentItemHandler: (f) => f,
};

CartItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  cart: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  product: PropTypes.instanceOf(Object),
  increaseCount: PropTypes.func,
  decreaseCount: PropTypes.func,
  removeFromCartHandler: PropTypes.func,
  setItemCount: PropTypes.func,
  selectCurrentItemHandler: PropTypes.func,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
  sendProductRequestHandler: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    shop: state.shop,
    product: state.product,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCount: (item) => dispatch(increaseItemCount(item)),
    decreaseCount: (item) => dispatch(decreaseItemCount(item)),
    removeFromCartHandler: (item) => dispatch(removeFromCart(item)),
    setItemCount: (item, count) => dispatch(setItemCountHandler(item, count)),
    selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
    sendProductRequestHandler: (id) => dispatch(sendProductRequest(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
