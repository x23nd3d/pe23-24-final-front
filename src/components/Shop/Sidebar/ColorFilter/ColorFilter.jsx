import React from "react";
import classNames from "classnames";
import classes from "./ColorFilter.module.scss";
// import "./_colors.scss";

const colors = ["black", "brown", "red", "white"];

const ColorFilter = (props) => (
  <div className={classes.ColorFilter}>
    <h3 className={classes.Title}>Colors</h3>
    <ul className={classes.Colors}>
      {colors.map((color) => (
        <li key={color} className={classNames(classes.Color, classes[color])}>
          {color}
        </li>
      ))}
    </ul>
  </div>
);

export default ColorFilter;
