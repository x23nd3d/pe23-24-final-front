import React from "react";
import PageContainer from "./Page Container/PageContainer";
import Slider from "./Main Page Slider/Slider";
import classes from "./MainPage.module.scss";
import CollectionsRoutes from "../../context/CollectionsRoutes/CollectionsRoutes";

const MainPage = () => (
  <div className={classes.MainPage}>
    <CollectionsRoutes>
      <Slider />
      <PageContainer />
    </CollectionsRoutes>
  </div>
);

export default MainPage;
