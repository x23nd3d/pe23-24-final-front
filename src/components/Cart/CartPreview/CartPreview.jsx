import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { withRouter } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import classes from "./CartPreview.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { toggleCartPreviewHandler } from "../../../store/actions/cart";

const CartPreview = ({ items, removeCartPreview, cart }) => {
  const { isPreviewActive } = cart;

  const renderCartItems = (cartItems) => {
    console.log(cartItems, "CARTTTT");

    return cartItems.map((item) => (
      <CartItem key={`item_${Math.random() * 20}${item.title}`} item={item} />
    ));
  };

  return (
    <>
      {isPreviewActive ? (
        <Backdrop isDark="true" toggle={() => removeCartPreview()} />
      ) : null}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classes.CartPreview}
        >
          <div className={classes.CartPreviewHeader}>
            <div className={classes.CartPreviewDetails}>
              <h4>Cart</h4>
              <button type="button" onClick={() => removeCartPreview()}>
                <i className="far fa-times" />
              </button>
            </div>
            <span className={classes.CartPreviewHr} />
          </div>
          <div className={classes.CartPreviewContent}>
            <div className={classes.CartContainer}>
              {cart.items.length ? (
                renderCartItems(items)
              ) : (
                <p className={classes.CartEmpty}>No items added</p>
              )}
            </div>
          </div>
          <div className={classes.CartShopping}>
            <div className={classes.CartContinueShopping}>
              <button type="button">Continue shopping</button>
            </div>
            <div className={classes.CartTotalSum}>
              <div className={classes.CartTotal}>
                Total: <span>&#36;</span>
                {cart.total}
              </div>
              <button type="button" className={classes.CartAddItems}>
                Checkout
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

CartPreview.propTypes = {
  items: PropTypes.instanceOf(Object).isRequired,
  cart: PropTypes.instanceOf(Object).isRequired,
  removeCartPreview: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCartPreview: () => dispatch(toggleCartPreviewHandler()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartPreview));
