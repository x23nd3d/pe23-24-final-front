import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";

const Popular = () => (
    <NavLink to="/shop/collections/?collections=popular"
        className={classNames(classes.group, classes.Popular)}
    >
        <div>
            <TranslucentBoxButton text="Popular" />
        </div>
    </NavLink>
);

export default Popular;