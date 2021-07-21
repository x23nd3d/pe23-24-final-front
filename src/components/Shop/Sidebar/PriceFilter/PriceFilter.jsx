import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import PropTypes, { instanceOf } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./_price-filter.scss";
import classes from "./PriceFilter.module.scss";
import { setChosenPriceRangeAction } from "../../../../store/actions/sidebar";

const PriceFilter = ({ shop, sidebar, setChosenPriceRangeHandler }) => {
  const [rangeValue, setRangeValue] = useState({
    min: 0,
    max: 0,
  });

  useEffect(
    () =>
      setRangeValue({
        min: sidebar.chosenPriceRange
          ? sidebar.chosenPriceRange.min
          : sidebar.currentItemsPriceRange.min,
        max: sidebar.chosenPriceRange
          ? sidebar.chosenPriceRange.max
          : sidebar.currentItemsPriceRange.max,
      }),
    [
      setRangeValue,
      sidebar.currentItemsPriceRange.max,
      sidebar.currentItemsPriceRange.min,
    ]
  );

  // console.log("RANGE VALUE:", rangeValue);

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
          maxValue={sidebar.currentItemsPriceRange.max}
          minValue={sidebar.currentItemsPriceRange.min}
          value={rangeValue}
          onChange={(value) => setRangeValue(value)}
          onChangeComplete={(value) => setChosenPriceRangeHandler(value)}
        />
      </div>
    </div>
  );
};

PriceFilter.defaultProps = {
  shop: {},
  sidebar: {},
  setChosenPriceRangeHandler: (f) => f,
};

PriceFilter.propTypes = {
  shop: instanceOf(Object),
  sidebar: instanceOf(Object),
  setChosenPriceRangeHandler: PropTypes.func,
};

const mapStateToProps = ({ shop, sidebar }) => ({
  shop,
  sidebar,
});

const mapDispatchToProps = (dispatch) => ({
  setChosenPriceRangeHandler: (chosenPriceRange) =>
    dispatch(setChosenPriceRangeAction(chosenPriceRange)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PriceFilter));
