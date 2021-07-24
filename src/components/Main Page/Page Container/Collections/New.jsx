import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import CollectionsRoutesContext from "../../../../context/CollectionsRoutes/CollectionsRoutesContext";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";

const New = () => {
  const { registerRoutesHandler } = useContext(CollectionsRoutesContext);
  return (
    <NavLink
      className={classNames(classes.group, classes.New)}
      to="/shop/?category=collections&type=new"
      onClick={() =>
        registerRoutesHandler("/shop/?category=collections&type=new", "new")
      }
    >
      <div>
        <TranslucentBoxButton text="New" />
      </div>
    </NavLink>
  );
};

export default New;
