import React from "react";
import classNames from "classnames";
import ListRoute from "../../../UI/ListRoute/ListRoute";
import classes from "./Navbar.module.scss";

const Nav = (props) => (
  <nav className={classes.Nav}>
    <ul className={classNames(classes.NavItems, classes.NavShop)}>
      <ListRoute route="/" content="Man" classes={classes.NavItem} />
      <ListRoute route="/" content="Woman" classes={classes.NavItem} />
      <ListRoute route="/" content="Accessory" classes={classes.NavItem} />
    </ul>
    <a className={classes.Logo} href="index.html">
      Originalité
    </a>
    <ul className={classNames(classes.NavItems, classes.NavTools)}>
      <ListRoute
        route="/"
        content="Search"
        classes={classNames(classes.NavItem, classes.NavItemSearch)}
      />
      <ListRoute
        route="/"
        content="My account"
        classes={classNames(classes.NavItem, classes.NavItemMyAccount)}
      />
      <ListRoute
        route="/"
        content="Shopping bag"
        classes={classNames(classes.NavItem, classes.NavItemShoppingBag)}
      />
    </ul>
  </nav>
);

export default Nav;
