import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import classes from "./PriceFilter.module.scss";

const PriceFilter = (props) => {
  const [rangeValue, setRangeValue] = useState({
    min: 2,
    max: 10,
  });

  return (
    <div className={classes.PriceFilter}>
      <h3 className={classes.Title}>Price</h3>
      <p className={classes.PriceRange}>$ 25 - 930</p>
      <div className={classes.RangeBlock}>
        <InputRange
          maxValue={20}
          minValue={0}
          value={rangeValue}
          onChange={(value) => setRangeValue(value)}
        />
        );
        {/* <input
          type="range"
          min="1"
          max="100"
          value="0"
          className="slider"
          id="myRange"
        />
        <input
          type="range"
          min="1"
          max="100"
          value="100"
          className="slider"
          id="myRange"
        /> */}
      </div>
    </div>
  );
};
export default PriceFilter;
