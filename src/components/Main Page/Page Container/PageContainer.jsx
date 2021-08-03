import React from "react";
import Collections from "./Collections/Collections";
import Categories from "./Categories/Categories";
import { container } from "./PageContainer.module.scss";

const PageContainer = () => (
  <div className={container}>
    <Collections />
    <Categories />
  </div>
);

export default PageContainer;
