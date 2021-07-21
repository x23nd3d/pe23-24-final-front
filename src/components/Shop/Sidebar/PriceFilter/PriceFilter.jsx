import React, { useState } from "react";
import InputRange from "react-input-range";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { instanceOf } from "prop-types";
import "./_price-filter.scss";
import classes from "./PriceFilter.module.scss";

const PriceFilter = ({ shop, sidebar }) => {
  const [rangeValue, setRangeValue] = useState({
    min: sidebar.currentItemsPriceRange.min,
    max: sidebar.currentItemsPriceRange.max,
  });

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
          onMouseUp={() => console.log(rangeValue)}
        />
      </div>
    </div>
  );
};

PriceFilter.defaultProps = {
  shop: {},
  sidebar: {},
};

PriceFilter.propTypes = {
  shop: instanceOf(Object),
  sidebar: instanceOf(Object),
};

const mapStateToProps = ({ shop, sidebar }) => ({
  shop,
  sidebar,
});

export default connect(mapStateToProps, null)(withRouter(PriceFilter));
