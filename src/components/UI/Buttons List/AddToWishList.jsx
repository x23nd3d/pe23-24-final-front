import React from "react";
import PropTypes from "prop-types";
import "../../Forms/Add to Cart/AddToCartForm.scss";
import AddToWishlistIcon from "../SVG Icons Components/AddToWishlistIcon";
import AlreadyInWishlistIcon from "../SVG Icons Components/AlreadyInWishlistIcon";

const AddToWishList = ({isAdded}) => (
  <button className="to-wishlist" type="button" >
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