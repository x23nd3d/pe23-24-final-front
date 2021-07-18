import React from "react";
import PropTypes from "prop-types";
import classes from "./CartItem.module.scss";

const CartItem = ({ item }) => (
  <div className={classes.CartItem} key={item.title}>
    <div className={classes.CartItemImage}>
      <img src={item.viewImage} alt="Cart Item" />
    </div>
    <div className={classes.CartItemGeneral}>
      <p>{item.description}</p>
      <div className={classes.CartCount}>
        <button type="button" className={classes.CartCountIncrease}>
          <i className="far fa-minus" />
        </button>
        <input className={classes.CartCountDetails} value={item.count} />
        <button type="button" className={classes.CartCountIncrease}>
          <i className="far fa-plus" />
        </button>
      </div>
    </div>
    <div className={classes.Manage}>
      <button type="button" className={classes.CartItemRemove}>
        <i className="far fa-trash-alt" />
      </button>
    </div>
  </div>
);

CartItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
};

export default CartItem;
