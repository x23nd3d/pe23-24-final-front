import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import ListRoute from "../../../UI/ListRoute/ListRoute";
import classes from "./Navbar.module.scss";

const Nav = (props) => (
  <nav className={classes.Nav}>
    <ul className={classNames(classes.NavItems, classes.NavShop)}>
      <ListRoute route="/" content="Man" listClass={classes.NavItem} />
      <ListRoute route="/" content="Woman" listClass={classes.NavItem} />
      <ListRoute route="/" content="Accessory" listClass={classes.NavItem} />
    </ul>
    <NavLink className={classes.Logo} to="/">
      Originalité
    </NavLink>
    <ul className={classNames(classes.NavItems, classes.NavTools)}>
      <ListRoute
        route="/"
        content="Search"
        listClass={classNames(classes.NavItem, classes.NavItemSearch)}
      />
      <ListRoute
        route="/"
        content="My account"
        listClass={classNames(classes.NavItem, classes.NavItemMyAccount)}
      />
      <ListRoute
        route="/"
        content="Shopping bag"
        listClass={classNames(classes.NavItem, classes.NavItemShoppingBag)}
      />
    </ul>
  </nav>
);

export default Nav;
