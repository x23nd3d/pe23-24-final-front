import React from "react";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";

const Recommended = () => (
    <div className={classNames(classes.group, classes.Recommended)}>
        <TranslucentBoxButton text="Recommended" />
    </div>
);

export default Recommended;