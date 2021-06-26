import React from "react";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import {category, shoes} from "./Categories.module.scss";

const Shoes = () => (
    <div className={classNames(category, shoes)}>
        <TranslucentBoxButton text="Shoes" />
    </div>
);
export default Shoes;