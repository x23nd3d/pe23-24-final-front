import React from "react";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";

const Popular = () => (
    <div className={classNames(classes.group, classes.Popular)} >
        <TranslucentBoxButton text="Popular" />
    </div>
);

export default Popular;