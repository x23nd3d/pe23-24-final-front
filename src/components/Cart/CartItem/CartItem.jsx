import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./CartItem.module.scss";
import pushNotification from "../../../utils/toastrConfig";
import {
  decreaseItemCount,
  increaseItemCount,
  removeFromCart,
} from "../../../store/actions/cart";

const CartItem = ({
  item,
  image,
  title,
  color,
  size,
  price,
  id,
  increaseCount,
  decreaseCount,
  removeFromCartHandler,
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
    classes.CounterButton,
    item.count === 1 ? classes.CartCountDecreaseOff : null,
  ];

  const increaseCountCls = [
    classes.CounterButton,
    item.count === item.left ? classes.CartCountIncreaseOff : null,
  ];

  return (
    <li className={classes.CartItem}>
      <div className={classes.ImageBox}>
        <img className={classes.Image} src={image} alt="description" />
      </div>
      <div className={classes.CartItemInfoBlock}>
        <h3 className={classes.CartItemTitle}>{title}</h3>
        <h4 className={classes.CartItemInfo}>ID: {id}</h4>
        <p className={classes.CartItemInfo}>Color: {color}</p>
        <p className={classes.CartItemInfo}>Size: {size}</p>
        <div className={classes.CartItemInfo}>
          Quantity:
          <div className={classes.Quantity}>
            <button
              className={decreaseCountCls.join(" ")}
              type="button"
              onClick={() => decreaseCountHandler(item)}
            >
              -
            </button>
            <span>{item.count}</span>
            <button
              className={increaseCountCls.join(" ")}
              type="button"
              onClick={() => increaseCountHandler(item)}
            >
              +
            </button>
          </div>
        </div>
        <p className={classes.CartItemInfo}>Price: {price}$</p>
        <p className={classes.CartItemTotal}>Total: {item.count * price}$</p>
      </div>
      <button
        className={classes.Remove}
        type="button"
        onClick={() => removeFromCartHandler(item)}
      >
        Remove from cart
      </button>
    </li>
  );
};

CartItem.defaultProps = {
  item: {},
  image: "",
  title: "",
  color: "",
  size: "",
  price: "",
  id: "",
  increaseCount: (f) => f,
  decreaseCount: (f) => f,
  removeFromCartHandler: (f) => f,
};
CartItem.propTypes = {
  item: PropTypes.instanceOf(Object),
  image: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.string,
  increaseCount: PropTypes.func,
  decreaseCount: PropTypes.func,
  removeFromCartHandler: PropTypes.func,
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
