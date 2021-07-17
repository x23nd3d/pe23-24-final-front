import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import classes from "./ColorFilter.module.scss";

const colors = ["black", "brown", "red", "white"];

const ColorFilter = (props) => {
  const [chosenColor, setChosenColors] = useState({ color: "" });

  const pickAColor = (color) => {
    setChosenColors({
      color: `${color.toLowerCase()}`,
    });
  };

  return (
    <div className={classes.ColorFilter}>
      <h3 className={classes.Title}>Colors</h3>
      <ul className={classes.Colors}>
        {colors.map((color) => (
          <li key={color}>
            <NavLink
              to="#"
              onClick={() => pickAColor(color)}
              className={classNames(classes.Color, classes[color])}
            >
              {color}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilter;
