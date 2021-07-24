import React, { useState, useEffect } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getMinMaxPrice } from "../../../../utils/sidebar.utils";
import "./_price-filter.scss";
import classes from "./PriceFilter.module.scss";
import {
  resetFiltersAction,
  setPriceRangeAction,
} from "../../../../store/actions/sidebar";

const PriceFilter = ({
  shop,
  sidebar,
  setPriceRangeHandler,
  resetFiltersHandler,
}) => {
  const [rangeValue, setRangeValue] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    setRangeValue({
      min: getMinMaxPrice(shop.currentItems).min,
      max: getMinMaxPrice(shop.currentItems).max,
    });
  }, [shop.currentItems, sidebar.reset]);

  return (
    <div className={classes.PriceFilter}>
      <h3 className={classes.Title}>Price</h3>
      <p className={classes.PriceRange}>
        ${rangeValue.min} - ${rangeValue.max}{" "}
      </p>
      <div className={classes.RangeBlock}>
        <Range
          min={getMinMaxPrice(shop.currentItems).min}
          max={getMinMaxPrice(shop.currentItems).max}
          value={[rangeValue.min, rangeValue.max]}
          onChange={(value) => {
            console.log(value);
            setRangeValue({ max: value[1], min: value[0] });
          }}
          onAfterChange={(value) =>
            setPriceRangeHandler({ max: value[1], min: value[0] })
          }
        />
      </div>
    </div>
  );
};

PriceFilter.defaultProps = {
  shop: {},
  sidebar: {},
  setPriceRangeHandler: (f) => f,
  resetFiltersHandler: (f) => f,
};

PriceFilter.propTypes = {
  shop: PropTypes.instanceOf(Object),
  sidebar: PropTypes.instanceOf(Object),
  setPriceRangeHandler: PropTypes.func,
  resetFiltersHandler: PropTypes.func,
};

const mapStateToProps = ({ shop, sidebar }) => ({
  shop,
  sidebar,
});

const mapDispatchToProps = (dispatch) => ({
  setPriceRangeHandler: (priceRange) =>
    dispatch(setPriceRangeAction(priceRange)),
  resetFiltersHandler: (priceRange) => dispatch(resetFiltersAction(priceRange)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PriceFilter));
