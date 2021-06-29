import React from "react";
import ColorFilter from "./ColorFilter/ColorFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import classes from "./Sidebar.module.scss";

const Sidebar = (props) => (
  <div className={classes.Sidebar}>
    <ColorFilter />
    <PriceFilter />
  </div>
);

export default Sidebar;
