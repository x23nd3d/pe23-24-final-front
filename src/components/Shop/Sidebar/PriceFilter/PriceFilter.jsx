import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputRange from "react-input-range";
import "./_price-filter.scss";
import classes from "./PriceFilter.module.scss";
import {
  adjustPriceRange,
  filterAction,
  filterByPriceRangeAction,
} from "../../../../store/actions/sidebar";
import { minMaxPrice } from "../../../../utils/sidebar";

const PriceFilter = ({
  shop,
  sidebar,
  filterActionHandler,
  adjustPriceRangeHandler,
}) => {
  const prices = minMaxPrice(shop.currentItems);

  const [rangeValue, setRangeValue] = useState({
    min: prices.min,
    max: prices.max,
  });

  // useEffect(() => adjustPriceRangeHandler(prices), [shop.currentItems]);

  console.log("MIN MAX PRICES:", prices);

  useEffect(() => {
    setRangeValue(prices);
    adjustPriceRangeHandler(prices);
    filterActionHandler();
  }, []);

  return (
    <div className={classes.PriceFilter}>
      <h3 className={classes.Title}>Price</h3>
      <p className={classes.PriceRange}>
        ${rangeValue.min} - ${rangeValue.max}{" "}
      </p>
      <div className={classes.RangeBlock}>
        <InputRange
          maxValue={prices.max}
          minValue={prices.min}
          value={rangeValue}
          onChange={(value) => setRangeValue(value)}
        />
      </div>
      <div className={classes.Buttons}>
        <button
          className={classes.Button}
          type="button"
          onClick={() => {
            adjustPriceRangeHandler(rangeValue);
            filterActionHandler();
            // filterActionHandler(shop.currentItems);
          }}
        >
          FILTER RANGE
        </button>
      </div>
    </div>
  );
};

PriceFilter.defaultProps = {
  sidebar: {},
  shop: {},
  adjustPriceRangeHandler: (f) => f,
  filterActionHandler: (f) => f,
  adjustPriceRangeHandler: (f) => f,
};

PriceFilter.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  adjustPriceRangeHandler: PropTypes.func,
  filterActionHandler: PropTypes.func,
  adjustPriceRangeHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    adjustPriceRangeHandler: (route) => dispatch(adjustPriceRange(route)),
    filterActionHandler: (items) => dispatch(filterAction(items)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PriceFilter));
