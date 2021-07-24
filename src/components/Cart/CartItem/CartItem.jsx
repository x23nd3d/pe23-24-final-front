import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./CartItem.module.scss";

const CartItem = ({ image, title, color, size, price }) => {
  const [counter, setCounter] = useState(1);

  const MIN_ITEMS_TO_BUY = 1;
  const increment = () => setCounter(counter + 1);
  const decrement = () => {
    if (counter < MIN_ITEMS_TO_BUY) return;
    setCounter(counter - 1);
  };

  return (
    <li className={classes.CartItem}>
      <div className={classes.ImageBox}>
        <img className={classes.Image} src={image} alt="description" />
      </div>
      <div className={classes.CartItemInfoBlock}>
        <h3 className={classes.CartItemTitle}>{title}</h3>
        <p className={classes.CartItemInfo}>Color: {color}</p>
        <p className={classes.CartItemInfo}>Size: {size}</p>
        <p className={classes.CartItemInfo}>
          Quantity:
          <div className={classes.Quantity}>
            <button
              className={classes.CounterButton}
              type="button"
              onClick={decrement}
            >
              -
            </button>
            <span>{counter}</span>
            <button
              className={classes.CounterButton}
              type="button"
              onClick={increment}
            >
              +
            </button>
          </div>
        </p>
        <p className={classes.CartItemInfo}>Price: {price}$</p>
        <p className={classes.CartItemTotal}>Total: {counter * price}$</p>
      </div>
      <button className={classes.Remove} type="button">
        Remove from cart
      </button>
    </li>
  );
};

CartItem.defaultProps = {
  image: "",
  title: "",
  color: [],
  size: [],
  price: "",
};
CartItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.instanceOf(Array),
  size: PropTypes.instanceOf(Array),
  price: PropTypes.string,
};

export default CartItem;
