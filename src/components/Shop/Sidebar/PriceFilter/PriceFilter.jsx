import React, { useState } from "react";
import InputRange from "react-input-range";
import "./_price-filter.scss";
import classes from "./PriceFilter.module.scss";

const PriceFilter = (props) => {
  const [rangeValue, setRangeValue] = useState({
    min: 0,
    max: 1500,
  });

  return (
    <div className={classes.PriceFilter}>
      <h3 className={classes.Title}>Price</h3>
      <p className={classes.PriceRange}>
        ${rangeValue.min} - ${rangeValue.max}{" "}
      </p>
      <div className={classes.RangeBlock}>
        <InputRange
          maxValue={1500}
          minValue={0}
          value={rangeValue}
          onChange={(value) => setRangeValue(value)}
        />
      </div>
    </div>
  );
};
export default PriceFilter;
