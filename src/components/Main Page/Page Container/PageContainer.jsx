import React from "react";
import Collections from "./Collections/Collections";
import Categories from "./Categories/Categories";
import Exposition from "../../Shop/Exposition/Exposition";

import {container} from "./PageContainer.module.scss";

const PageContainer = () => (
    <div className={container} >
        <Exposition />
        <Collections />
        <Categories />
    </div>
);

export default PageContainer;