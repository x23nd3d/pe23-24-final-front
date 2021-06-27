import React from "react";
import PageContainer from "./Page Container/PageContainer";
// import CardContainer from "../UI/CardContainer/CardContainer";
import Slider from "./Slider/Slider";
import Footer from "./Footer/Footer";
import classes from "./MainPage.module.scss";

const MainPage = () => (
  <div className={classes.MainPage}>
    <Slider />
    <PageContainer />
    {/* <CardContainer /> */}
    <Footer />
  </div>
);

export default MainPage;
