import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";

const New = () => (
    <NavLink className={classNames(classes.group, classes.New)} to="/shop/collections/?collection=new" >
        <div>
            <TranslucentBoxButton text="New" />
        </div>
    </NavLink>
);

export default New;