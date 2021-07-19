import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InputRange from "react-input-range";
import {
  chooseColor,
  choosePriceRange,
} from "../../../../store/actions/sidebar";
import "./_price-filter.scss";
import classes from "./PriceFilter.module.scss";

const PriceFilter = ({ sidebar, shop, priceRangeChooser, colorChooser }) => {
  const [rangeValue, setRangeValue] = useState({
    min: 0,
    max: 0,
  });

  const allPrices = shop.currentItems.map((item) => item.price);
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);

  useEffect(() => {
    setRangeValue({
      min: minPrice,
      max: maxPrice,
    });
  }, [minPrice, maxPrice]);

  return (
    <div className={classes.PriceFilter}>
      <h3 className={classes.Title}>Price</h3>
      <p className={classes.PriceRange}>
        ${rangeValue.min} - ${rangeValue.max}{" "}
      </p>
      <div className={classes.RangeBlock}>
        <InputRange
          // maxValue={1500}
          // minValue={0}
          maxValue={maxPrice}
          minValue={minPrice}
          value={rangeValue}
          onChange={(value) => {
            setRangeValue(value);
          }}
        />
      </div>
      <div className={classes.Buttons}>
        <button
          className={classes.Button}
          type="button"
          onClick={() => priceRangeChooser(rangeValue)}
        >
          Filter
        </button>
        <button
          className={classes.Button}
          type="button"
          onClick={() => {
            priceRangeChooser({ min: minPrice, max: maxPrice });
            setRangeValue({
              min: minPrice,
              max: maxPrice,
            });
            colorChooser([]);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

PriceFilter.defaultProps = {
  sidebar: {},
  shop: {},
  priceRangeChooser: (f) => f,
  colorChooser: (f) => f,
};

PriceFilter.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  priceRangeChooser: PropTypes.func,
  colorChooser: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    priceRangeChooser: (route) => dispatch(choosePriceRange(route)),
    colorChooser: (route) => dispatch(chooseColor(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PriceFilter));
