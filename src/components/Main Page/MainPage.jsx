import React from "react";
import PageContainer from "./Page Container/PageContainer";
import Slider from "./Slider/Slider";
import Footer from "./Footer/Footer";
import Search from "../Header/Navbar/Search/Search"
import classes from "./MainPage.module.scss";
import {ReactComponent as HeartIcon}  from "../UI/Buttons List/Buttons List Img/whiteheart.svg"

const MainPage = () => (
  <div className={classes.MainPage}>
    <Slider />
    <PageContainer />
    <Footer />
    <Search />
  </div>
);

export default MainPage;
