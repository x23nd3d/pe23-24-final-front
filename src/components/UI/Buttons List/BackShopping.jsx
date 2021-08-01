import React from "react";
import PropTypes from "prop-types";
import classes from "../../Forms/Add to Cart/AddToCartForm.module.scss";
import BackShoppingIcon from "../SVG Icons Components/BackShoppingIcon";

const BackShopping = ({ history }) => (
  <button
    data-testid="BackShoppingTestId"
    className={classes.backShopping}
    type="button"
    onClick={() => history.goBack()}
  >
    <BackShoppingIcon />
  </button>
);

BackShopping.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default BackShopping;
