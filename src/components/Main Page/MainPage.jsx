import React from "react";
import PageContainer from "./Page Container/PageContainer";
// import CardContainer from "../UI/CardContainer/CardContainer";
import Footer from "./Footer/Footer";
import classes from "./MainPage.module.scss";

const MainPage = () => (
  <div className={classes.MainPage}>
    <PageContainer />
    {/* <CardContainer /> */}
    <Footer />
  </div>
);

export default MainPage;
