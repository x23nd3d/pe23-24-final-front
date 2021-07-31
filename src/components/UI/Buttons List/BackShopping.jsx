import React from "react";
import classes from "../../Forms/Add to Cart/AddToCartForm.module.scss";
import BackShoppingIcon from "../SVG Icons Components/BackShoppingIcon";

const BackShopping = () => (
  <button className={classes.backShopping} type="button">
    <BackShoppingIcon />
  </button>
);

export default BackShopping