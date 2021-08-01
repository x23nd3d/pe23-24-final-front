import React from "react";
import PropTypes from "prop-types";
import AddToCartIcon from "../../UI/SVGIconsComponents/AddToCartIcon";
import isAvailableCart from "../../../utils/isAvailable";
import classes from "./AddToCartForm.module.scss";

const AddToCartButton = ({ isAvailable }) => (
  <button className={classes.submit} type="submit">
    <div className={classes.AddToCartButtonContainer}>
      <span
        className={classes.AddToCartButtonText}
        style={isAvailableCart(isAvailable)}
      >
        Add to Cart
      </span>
      <AddToCartIcon available={isAvailable} />
    </div>
  </button>
);

AddToCartButton.defaultProps = {
  isAvailable: true,
};

AddToCartButton.propTypes = {
  isAvailable: PropTypes.bool,
};

export default AddToCartButton;
