import React from "react";
import PropTypes from "prop-types";
import classes from "../../Forms/Add to Cart/AddToCartForm.module.scss";
import AddToWishlistIcon from "../SVG Icons Components/AddToWishlistIcon";
import AlreadyInWishlistIcon from "../SVG Icons Components/AlreadyInWishlistIcon";

const AddToWishList = ({isAdded}) => (
  <button data-testid="AddToWishListTestId" className={classes.toWishlist} type="button" >
    {isAdded ? <AlreadyInWishlistIcon /> : <AddToWishlistIcon /> }
  </button>
);

AddToWishList.defaultProps = {
  isAdded: false
}

AddToWishList.propTypes = {
  isAdded: PropTypes.bool
}

export default AddToWishList;