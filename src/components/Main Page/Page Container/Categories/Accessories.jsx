import React from "react";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import {category, accessories}  from "./Categories.module.scss";


const Accessories = () => (
    <div className={classNames(category, accessories)}>
        <TranslucentBoxButton text="Accessories" />
    </div>
);

export default Accessories;