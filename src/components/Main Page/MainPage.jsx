import React from "react";
import classes from "./MainPage.module.scss";
import CardContainer from "../UI/CardContainer/CardContainer";
import Categories from "./Categories/Categories";
import Footer from "./Footer/Footer";

const MainPage = () => (
  <div className={classes.MainPage}>
    <CardContainer />
    <Categories />
    <Footer />
  </div>
);

export default MainPage;
