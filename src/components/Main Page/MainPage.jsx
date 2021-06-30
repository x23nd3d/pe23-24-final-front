import React from "react";
import PageContainer from "./Page Container/PageContainer";
import Slider from "./Slider/Slider";
import Footer from "./Footer/Footer";
import classes from "./MainPage.module.scss";

const MainPage = () => (
  <div className={classes.MainPage}>
    <Slider />
    <PageContainer />
    <Footer />
  </div>
);

export default MainPage;
