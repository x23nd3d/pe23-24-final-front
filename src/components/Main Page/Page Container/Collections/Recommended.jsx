import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";

const Recommended = () => (
    <NavLink to="/shop/collections/?collection=recommended"
        className={classNames(classes.group, classes.Recommended)}
    >
        <div>
            <TranslucentBoxButton text="Recommended" />
        </div>
    </NavLink>
);

export default Recommended;