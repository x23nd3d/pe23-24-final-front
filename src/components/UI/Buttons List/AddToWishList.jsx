import React from "react";
import PropTypes from "prop-types";
import classes from "../../Forms/Add to Cart/AddToCartForm.module.scss";
import AddToWishlistIcon from "../SVGIconsComponents/AddToWishlistIcon";
import AlreadyInWishlistIcon from "../SVGIconsComponents/AlreadyInWishlistIcon";

const AddToWishList = ({ onWish, isAdded, item, toggle, isAuth, history }) => {
  if (isAuth) {
    const onClickHandler = () => {
      onWish(item);
      toggle(item);
    };
    return (
      <button
        data-testid="AddToWishListTestId"
        className={classes.toWishlist}
        type="button"
        onClick={onClickHandler}
      >
        {isAdded ? <AlreadyInWishlistIcon /> : <AddToWishlistIcon />}
      </button>
    );
  }
  return (
    <button
      data-testid="AddToWishListTestId"
      className={classes.toWishlist}
      type="button"
      onClick={() => history.push("/login")}
    >
      {isAdded ? <AlreadyInWishlistIcon /> : <AddToWishlistIcon />}
    </button>
  );
};

AddToWishList.defaultProps = {
  isAdded: false,
  isAuth: false,
};

AddToWishList.propTypes = {
  isAdded: PropTypes.bool,
  isAuth: PropTypes.bool,
  item: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  toggle: PropTypes.func.isRequired,
  onWish: PropTypes.func.isRequired,
};

export default AddToWishList;
