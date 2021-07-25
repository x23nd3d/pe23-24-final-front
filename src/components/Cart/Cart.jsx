import React from "react";
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

const Cart = ({
  cart,
  receiveRoute,
  categoryChooser,
  subcategoryChooser,
  checkCategoriesHandler,
}) => {
  const registerRoutesHandler = (route, subcategory, mainRoute) => {
    receiveRoute(route);
    checkCategoriesHandler(mainRoute);
    categoryChooser(mainRoute);
    subcategoryChooser(subcategory);
  };

  return (
    <div className={classes.Cart}>
      <div className={classes.Inner}>
        <div className={classes.Carts}>
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
            {cart.items.length ? (
              cart.items.map((item) => (
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
          <p className={classes.Discount}>Add a discount code</p>
          <form action="#">
            <input className={classes.DiscountCode} type="text" />
          </form>
          <p className={classes.AsideInfo}>Order value 420$</p>
          <p className={classes.AsideInfo}>Delivery Free</p>
          <p className={classes.AsideInfo}>Total {cart.total}$</p>
          <NavLink
            to="/checkout"
            className={classnames(classes.Button, classes.ButtonCheckout)}
            type="button"
          >
            Checkout
          </NavLink>
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
};

Cart.propTypes = {
  cart: PropTypes.instanceOf(Object).isRequired,
  receiveRoute: PropTypes.func,
  categoryChooser: PropTypes.func,
  subcategoryChooser: PropTypes.func,
  checkCategoriesHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    ...state,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
    categoryChooser: (route) => dispatch(chooseCategory(route)),
    subcategoryChooser: (route) => dispatch(chooseSubcategory(route)),
    checkCategoriesHandler: (category, sub) =>
      dispatch(checkCategories(category, sub)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
