import React from "react";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";

const New = () => (
    <div className={classNames(classes.group, classes.New)}>
        <TranslucentBoxButton text="New" />
    </div>
);

export default New;