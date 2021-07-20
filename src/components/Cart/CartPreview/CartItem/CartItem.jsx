import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  decreaseItemCount,
  increaseItemCount,
  removeFromCart,
  setItemCountHandler,
} from "../../../../store/actions/cart";
import classes from "./CartItem.module.scss";

const CartItem = ({
  item,
  cart,
  increaseCount,
  decreaseCount,
  removeFromCartHandler,
  setItemCount,
}) => {
  const decreaseCountHandler = (currentItem) => {
    if (currentItem.count === 1) {
      return;
    }
    decreaseCount(currentItem);
  };

  const decreaseCountCls = [
    item.count === 1 ? classes.CartCountDecreaseOff : null,
  ];

  return (
    <div className={classes.CartItem} key={item.title}>
      <div className={classes.CartItemImage}>
        <img src={item.viewImage} alt="Cart Item" />
      </div>
      <div className={classes.CartItemGeneral}>
        <p>{item.description}</p>
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
              onBlur={(e) => setItemCount(item, Number(e.target.value))}
            />
            <button
              type="button"
              onClick={() => increaseCount(item)}
              className={classes.CartCountIncrease}
            >
              <i className="far fa-plus" />
            </button>
          </div>
          <div className={classes.CartItemMoreDetails}>
            <div className={classes.CartItemDetails}>
              {item.size ? (
                <p>
                  <i className="far fa-tshirt" />
                  {item.size}
                </p>
              ) : null}
              {item.color ? (
                <p>
                  <i className="far fa-palette" /> {item.color}
                </p>
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
  increaseCount: (f) => f,
  decreaseCount: (f) => f,
  removeFromCartHandler: (f) => f,
  setItemCount: (f) => f,
};

CartItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  cart: PropTypes.instanceOf(Object),
  increaseCount: PropTypes.func,
  decreaseCount: PropTypes.func,
  removeFromCartHandler: PropTypes.func,
  setItemCount: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCount: (item) => dispatch(increaseItemCount(item)),
    decreaseCount: (item) => dispatch(decreaseItemCount(item)),
    removeFromCartHandler: (item) => dispatch(removeFromCart(item)),
    setItemCount: (item, count) => dispatch(setItemCountHandler(item, count)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
