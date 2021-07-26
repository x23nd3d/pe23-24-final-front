import React from "react";
import PropTypes from "prop-types";
import AddToCartIcon from "../../UI/SVG Icons Components/AddToCartIcon";
import isAvailableCart from "../../../utils/isAvailable";
import "./AddToCartForm.scss";

const AddToCartButton = ({isAvailable}) => (
  <button className="submit" type="submit">
    <div className="AddToCartButtonContainer">
      <span
        className="AddToCartButtonText"
        style={isAvailableCart(isAvailable)}
      >Add to Cart</span>
      <AddToCartIcon available={isAvailable} />
    </div>
  </button>
);

AddToCartButton.defaultProps = {
  isAvailable: true
}

AddToCartButton.propTypes = {
  isAvailable: PropTypes.bool
}

export default AddToCartButton;