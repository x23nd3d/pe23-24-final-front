import React from "react";
import PropTypes from "prop-types";
import classes from "./Cart.module.scss";

const Discount = ({ total }) => {
  const offPrice = (total * 15) / 100;
  return (
    <div className={classes.DiscountBlock}>
      <div className={classes.DiscountForm}>
        For your first purchase you can use the following discount code
        <span className={classes.Code}>xJlqFcLP</span> to get your first 15% off
        and save ${offPrice}
      </div>
    </div>
  );
};

Discount.propTypes = {
  total: PropTypes.number.isRequired,
};

export default Discount;
