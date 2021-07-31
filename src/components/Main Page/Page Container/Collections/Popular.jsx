import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";
import CollectionsRoutesContext from "../../../../context/CollectionsRoutes/CollectionsRoutesContext";

const Popular = () => {
  const { registerRoutesHandler } = useContext(CollectionsRoutesContext);
  return (
    <NavLink
      to="/shop/?category=collections&type=popular"
      onClick={() =>
        registerRoutesHandler(
          "/shop/?category=collections&type=popular",
          "popular",
          "collections"
        )
      }
      className={classNames(classes.group, classes.Popular)}
    >
      <div>
        <TranslucentBoxButton text="Popular" />
      </div>
    </NavLink>
  );
};

export default Popular;
