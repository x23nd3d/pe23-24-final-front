import React from "react";
import classes from "./MainPage.module.scss";
import Categories from "./Categories/Categories";

const MainPage = () => (
  <>
  <Categories />
  <div className={classes.MainPage}>Welcome to the Main page!</div>
  </>
);

export default MainPage;
