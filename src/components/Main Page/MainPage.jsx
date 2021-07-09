import React from "react";
import PageContainer from "./Page Container/PageContainer";
import Slider from "./Main Page Slider/Slider";
import classes from "./MainPage.module.scss";
import { ReactComponent as HeartIcon } from "../UI/Buttons List/Buttons List Img/whiteheart.svg";

const MainPage = () => (
  <div className={classes.MainPage}>
    <Slider />
    <PageContainer />
  </div>
);

export default MainPage;
