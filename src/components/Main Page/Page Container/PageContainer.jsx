import React from "react";
import {container} from "./PageContainer.module.scss";
import Categories from "./Categories/Categories";

const PageContainer = () => (
    <div className={container} >
        <Categories />
    </div>
);

export default PageContainer;