import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.scss";

const Cart = ({ cart }) => (
  <div className={classes.Cart}>
    <div className={classes.Inner}>
      <div className={classes.Carts}>
        <button className={classes.Button} type="button">
          Keep shopping
        </button>
        <ul className={classes.CartItems}>
          {cart.items.map((item) => (
            <CartItem
              key={item.id + item.color}
              item={item}
              title={item.name}
              image={item.photo[item.color][0]}
              id={item.id}
              color={item.color}
              size={item.size}
              quantity={item.left}
              price={item.price}
              count={item.count}
            />
          ))}
        </ul>
      </div>
      <aside className={classes.Aside}>
        <h3 className={classes.CartTotal}>Shopping Cart Total</h3>
        <p className={classes.Discount}>Add a discount code</p>
        <form action="#">
          <input className={classes.DiscountCode} type="text" />
        </form>
        <p className={classes.AsideInfo}>Order value 420$</p>
        <p className={classes.AsideInfo}>Delivery Free</p>
        <p className={classes.AsideInfo}>Total {cart.total}$</p>
        <button className={classes.Button} type="button">
          Checkout
        </button>
      </aside>
    </div>
  </div>
);

Cart.propTypes = {
  cart: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    ...state,
    cart: state.cart,
  };
}

export default connect(mapStateToProps)(Cart);
