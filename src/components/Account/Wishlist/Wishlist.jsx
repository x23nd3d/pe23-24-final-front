import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import classes from "./Wishlist.module.scss";
import { addToCart } from "../../../store/actions/cart";
import {
  colorAction,
  photoAction,
  selectCurrentItem,
  sendProductRequest,
  visitedProductsAction,
} from "../../../store/actions/product";
import { toggleWishListHandler } from "../../../store/actions/user";

const Wishlist = ({
  user,
  addToCartHandler,
  cart,
  selectCurrentItemHandler,
  dispatchVisitedProducts,
  dispatchColor,
  dispatchPhoto,
  sendProductRequestHandler,
  toggleWishList,
}) => {
  const { wishlist } = user.userId;

  const dispatchProduct = async (item) => {
    await sendProductRequestHandler(item.id);
    dispatchVisitedProducts(item);
  };

  const renderWishListItems = () =>
    wishlist.map((item) => (
      <ul className={classes.MyWishlistItems}>
        <li className={classes.CartItem}>
          <div className={classes.ImageBox}>
            <img
              className={classes.Image}
              src={item.viewImage}
              alt="description"
            />
          </div>
          <div className={classes.CartItemInfoBlock}>
            <h3 className={classes.CartItemTitle}>{item.name}</h3>
            <h4 className={classes.CartItemInfo}>ID: {item.id} </h4>
            <p className={classes.CartItemInfo}>Color: {item.color}</p>
            {item.size ? (
              <p className={classes.CartItemInfo}>Size: {item.size}</p>
            ) : null}

            <p className={classes.CartItemInfo}>Price: {item.price}</p>
          </div>
          <div className={classes.Buttons}>
            <button
              className={classes.Button}
              type="button"
              onClick={() => addToCartHandler(item)}
            >
              Add to cart
            </button>
            <button
              className={classnames(classes.Button, classes.ButtonRemove)}
              type="button"
              onClick={() => toggleWishList(item)}
            >
              Remove
            </button>
            <NavLink
              to={`/shop/product/${item.id}`}
              className={classes.Open}
              onClick={() => dispatchProduct(item)}
            >
              Open product
            </NavLink>
          </div>
        </li>
      </ul>
    ));

  return (
    <div className={classes.MyWishlist}>
      {!wishlist.length ? (
        <h3 className={classes.MyWishlistTitle}>Your wishlist is empty</h3>
      ) : (
        renderWishListItems()
      )}
    </div>
  );
};

Wishlist.defaultProps = {
  user: {},
  cart: {},
  addToCartHandler: (f) => f,
};

Wishlist.propTypes = {
  user: PropTypes.instanceOf(Object),
  cart: PropTypes.instanceOf(Object),
  addToCartHandler: PropTypes.func,
  selectCurrentItemHandler: PropTypes.func.isRequired,
  dispatchPhoto: PropTypes.func.isRequired,
  dispatchColor: PropTypes.func.isRequired,
  dispatchVisitedProducts: PropTypes.func.isRequired,
  sendProductRequestHandler: PropTypes.func.isRequired,
  toggleWishList: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCartHandler: (item) => dispatch(addToCart(item)),
    selectCurrentItemHandler: (item) => dispatch(selectCurrentItem(item)),
    dispatchColor: (value) => dispatch(colorAction(value)),
    dispatchPhoto: (value) => dispatch(photoAction(value)),
    dispatchVisitedProducts: (value) => dispatch(visitedProductsAction(value)),
    sendProductRequestHandler: (id) => dispatch(sendProductRequest(id)),
    toggleWishList: (item) => dispatch(toggleWishListHandler(item)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
