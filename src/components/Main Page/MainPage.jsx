import React from "react";
import classes from "./MainPage.module.scss";
import CardContainer from "../UI/CardContainer/CardContainer";
import Categories from "./Categories/Categories";

const MainPage = () => (
  <div className={classes.MainPage}>
    <CardContainer />
    <Categories />
  </div>
);

export default MainPage;
