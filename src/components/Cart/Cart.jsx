import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.scss";
import { receiveCurrentRoute } from "../../store/actions/shop";
import {
  checkCategories,
  chooseCategory,
  chooseSubcategory,
} from "../../store/actions/sidebar";
import LoginForm from "../LoginRegistration/LoginForm";
import RegistrationForm from "../LoginRegistration/RegistrationForm";
import { setLoginActiveTab } from "../../store/actions/user";
import { checkDiscount, resetDiscount } from "../../store/actions/cart";

const Cart = ({
  cart,
  user,
  auth,
  receiveRoute,
  categoryChooser,
  subcategoryChooser,
  checkCategoriesHandler,
  setLoginActiveTabHandler,
  checkDiscountHandler,
  discountResetHandler,
}) => {
  useEffect(() => {
    discountResetHandler();
  }, [discountResetHandler]);

  const registerRoutesHandler = (route, subcategory, mainRoute) => {
    receiveRoute(route);
    checkCategoriesHandler(mainRoute);
    categoryChooser(mainRoute);
    subcategoryChooser(subcategory);
  };

  const parseDiscountCondition = (alpha, omega, bravo) => {
    if (cart.discount.error && cart.discount.typed) {
      return alpha;
    }
    if (!cart.discount.error && cart.discount.code) {
      return omega;
    }

    if (cart.discount.error && cart.discount.exists) {
      return bravo;
    }

    return null;
  };

  const clsDiscounts = [
    classes.DiscountCode,
    parseDiscountCondition(
      classes.CartDiscountError,
      classes.CartDiscountSuccess,
      classes.CartDiscountExists
    ),
  ];

  const renderTotalPrice = () => {
    if (cart.discount.code && cart.totalOff > 0) {
      const totalPrice = `$${cart.totalOff}`;
      return (
        <>
          <s>{cart.total}</s>
          <span className={classes.TotalPrice}>{totalPrice}</span>
        </>
      );
    }
    return cart.total;
  };

  const percentage = cart.discount.code ? cart.discount.code.percentage : null;

  return (
    <div className={classes.Cart}>
      <div className={classes.Inner}>
        <div className={classes.Carts}>
          {!auth.token && (
            <>
              <h3 className={classes.CartLoginMessage}>
                {user.loginActiveTab
                  ? "Please, enter your login information, or"
                  : "Please, sign up to proceed with shopping, or"}
              </h3>
              <button
                className={classes.CartSwitchForm}
                type="button"
                onClick={() => setLoginActiveTabHandler(!user.loginActiveTab)}
              >
                {user.loginActiveTab ? "Sign up" : "Log in"}
              </button>
            </>
          )}
          {!auth.token &&
            (user.loginActiveTab ? (
              <LoginForm cart />
            ) : (
              <RegistrationForm cart />
            ))}
          <NavLink
            className={classes.Button}
            type="button"
            to="/shop/?category=all&type=all"
            onClick={() =>
              registerRoutesHandler(
                "/shop/?category=all&type=all",
                "all",
                "all"
              )
            }
          >
            Keep shopping
          </NavLink>
          <ul className={classes.CartItems}>
            {cart.items && cart.total > 0 ? (
              cart.items.map((item) => (
                <CartItem
                  key={item.id + item.color + Math.random() * 10}
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
              ))
            ) : (
              <p className={classes.CartNoItems}>
                No items found. The cart is waiting for you.
              </p>
            )}
          </ul>
        </div>
        <aside className={classes.Aside}>
          <h3 className={classes.CartTotal}>Shopping Cart Total</h3>
          {cart.items.length ? (
            <>
              <p className={classes.Discount}>Add a discount code</p>
              <input
                onChange={(e) => checkDiscountHandler(e.target)}
                defaultValue={
                  cart.discount.code ? cart.discount.code.key : null
                }
                className={clsDiscounts.join(" ")}
                type="text"
              />
              {parseDiscountCondition(
                <p
                  className={classnames(
                    classes.DiscountCodeCheck,
                    classes.DiscountNotFound
                  )}
                >
                  Code not found
                </p>,
                <p
                  className={classnames(
                    classes.DiscountCodeCheck,
                    classes.DiscountFound
                  )}
                >
                  You save: ${cart.offSaved} / {percentage}%
                </p>,
                <p
                  className={classnames(
                    classes.DiscountCodeCheck,
                    classes.DiscountExists
                  )}
                >
                  The code was already used or expired
                </p>
              )}
            </>
          ) : null}

          <p className={classes.AsideInfo}>Delivery Free</p>
          <p className={classes.AsideInfo}>Total ${renderTotalPrice()}</p>
          {auth.token && cart.items.length ? (
            <NavLink
              to="/checkout"
              className={classnames(classes.Button, classes.ButtonCheckout)}
              type="button"
            >
              Checkout
            </NavLink>
          ) : (
            <p className={classes.CheckoutLogin}>
              {cart.items.length
                ? "Please login to checkout."
                : "The cart is empty"}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};

Cart.defaultProps = {
  receiveRoute: (f) => f,
  categoryChooser: (f) => f,
  subcategoryChooser: (f) => f,
  checkCategoriesHandler: (f) => f,
  setLoginActiveTabHandler: (f) => f,
  checkDiscountHandler: (f) => f,
  discountResetHandler: (f) => f,
};

Cart.propTypes = {
  cart: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  receiveRoute: PropTypes.func,
  categoryChooser: PropTypes.func,
  subcategoryChooser: PropTypes.func,
  setLoginActiveTabHandler: PropTypes.func,
  checkCategoriesHandler: PropTypes.func,
  checkDiscountHandler: PropTypes.func,
  discountResetHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
    user: state.user,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
    categoryChooser: (route) => dispatch(chooseCategory(route)),
    subcategoryChooser: (route) => dispatch(chooseSubcategory(route)),
    checkCategoriesHandler: (category, sub) =>
      dispatch(checkCategories(category, sub)),
    setLoginActiveTabHandler: (tab) => dispatch(setLoginActiveTab(tab)),
    checkDiscountHandler: (key) => dispatch(checkDiscount(key)),
    discountResetHandler: () => dispatch(resetDiscount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
