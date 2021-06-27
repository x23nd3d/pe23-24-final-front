import React from "react";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import {category, clothes} from "./Categories.module.scss";

const Clothes = () => (
    <div className={classNames(category, clothes)}>
        <TranslucentBoxButton text="Clothes" />
    </div>
);

export default Clothes;