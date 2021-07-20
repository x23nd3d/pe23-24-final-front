import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputRange from "react-input-range";
import "./_price-filter.scss";
import classes from "./PriceFilter.module.scss";
import {
  adjustPriceRange,
  adjustPriceRangeAction,
  filterByPriceRangeAction,
} from "../../../../store/actions/sidebar";
import { getArrayWithUniqueFlatSortedItems } from "../../../../utils/sidebar";

const PriceFilter = ({
  shop,
  sidebar,
  adjustPriceRangeHandler,
  filterByPriceRangeHandler,
}) => {
  const [rangeValue, setRangeValue] = useState({
    min: 0,
    max: 1500,
  });

  const minMaxPrice = () => {
    const prices = shop.currentItems.map((item) => Number(item.price));

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };

  useEffect(
    () =>
      setRangeValue({
        min: minMaxPrice().min,
        max: minMaxPrice().max,
      }),
    []
  );

  return (
    <div className={classes.PriceFilter}>
      <h3 className={classes.Title}>Price</h3>
      <p className={classes.PriceRange}>
        ${rangeValue.min} - ${rangeValue.max}{" "}
      </p>
      <div className={classes.RangeBlock}>
        <InputRange
          maxValue={minMaxPrice().max}
          minValue={minMaxPrice().min}
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
            filterByPriceRangeHandler(shop.currentItems, {
              min: 100,
              max: 500,
            });
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
  filterByPriceRangeHandler: (f) => f,
};

PriceFilter.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  adjustPriceRangeHandler: PropTypes.func,
  filterByPriceRangeHandler: PropTypes.func,
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
    filterByPriceRangeHandler: (route) =>
      dispatch(filterByPriceRangeAction(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PriceFilter));
