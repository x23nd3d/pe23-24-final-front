import React from "react";
import ColorFilter from "./ColorFilter/ColorFilter";
import classes from "./Sidebar.module.scss";

const Sidebar = (props) => (
  <div className={classes.Sidebar}>
    <h1 style={{ color: "white" }}>Hello from Sidebar! :D</h1>
    <ColorFilter />
  </div>
);

export default Sidebar;
