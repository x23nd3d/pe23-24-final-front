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
import { selectCurrentItem } from "../../../../store/actions/product";
import classes from "./CartItem.module.scss";
import colorize from "../../../../utils/colorize";

const CartItem = ({
  item,
  shop,
  cart,
  increaseCount,
  decreaseCount,
  removeFromCartHandler,
  selectCurrentItemHandler,
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

  const idx = shop.currentItems.findIndex((current) => current.id === item.id);
  const colorClass = colorize(item.color.trim());

  return (
    <div className={classes.CartItem} key={item.title}>
      <div className={classes.CartItemImage}>
        <img src={item.viewImage} alt="Cart Item" />
      </div>
      <div className={classes.CartItemGeneral}>
        <NavLink
          to={`/shop/product/${item.id}`}
          onClick={() => selectCurrentItemHandler(shop.currentItems[idx])}
        >
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
  increaseCount: PropTypes.func,
  decreaseCount: PropTypes.func,
  removeFromCartHandler: PropTypes.func,
  setItemCount: PropTypes.func,
  selectCurrentItemHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCount: (item) => dispatch(increaseItemCount(item)),
    decreaseCount: (item) => dispatch(decreaseItemCount(item)),
    removeFromCartHandler: (item) => dispatch(removeFromCart(item)),
    setItemCount: (item, count) => dispatch(setItemCountHandler(item, count)),
    selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
