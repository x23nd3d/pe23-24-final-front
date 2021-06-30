import React from "react";
import Collections from "./Collections/Collections";
import Categories from "./Categories/Categories";
import Exposition from "../../Shop/Exposition/Exposition";

import {container} from "./PageContainer.module.scss";

const list = [{name: "name1", price: "pr1", id: "222"}, {name: "name2", price: "pr2", id: "223"}, {name: "name4", price: "pr4", id: "225"}, {name: "name6", price: "pr6", id: "226"}]

const PageContainer = () => (
    <div className={container} >
        <Exposition ProductList={list} />
        <Collections />
        <Categories />
    </div>
);

export default PageContainer;