import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import TranslucentBoxButton from "../../../UI/Translucent Box Button/TranslucentBoxButton";
import classes from "./Collections.module.scss";
import CollectionsRoutesContext from "../../../../context/CollectionsRoutes/CollectionsRoutesContext";

const Recommended = () => {
  const { registerRoutesHandler } = useContext(CollectionsRoutesContext);
  return (
    <NavLink
      to="/shop/?category=collections&type=recommended"
      onClick={() =>
        registerRoutesHandler(
          "/shop/?category=collections&type=recommended",
          "recommended"
        )
      }
      className={classNames(classes.group, classes.Recommended)}
    >
      <div>
        <TranslucentBoxButton text="Recommended" />
      </div>
    </NavLink>
  );
};

export default Recommended;
