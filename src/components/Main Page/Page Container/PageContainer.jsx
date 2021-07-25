import React from "react";
import Collections from "./Collections/Collections";
import Categories from "./Categories/Categories";

import { container } from "./PageContainer.module.scss";
import CollectionsRoutes from "../../../context/CollectionsRoutes/CollectionsRoutes";

const PageContainer = () => (
  <div className={container}>
    <CollectionsRoutes>
      <Collections />
      <Categories />
    </CollectionsRoutes>
  </div>
);

export default PageContainer;
