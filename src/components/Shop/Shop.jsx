import React from "react";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";

const Shop = (props) => (
  <div className={classes.Shop}>
    <Sidebar />
  </div>
);

export default Shop;
