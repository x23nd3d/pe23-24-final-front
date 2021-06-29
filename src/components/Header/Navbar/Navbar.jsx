import React, { useState } from "react";
import classNames from "classnames";
import ListRoute from "../../UI/ListRoute/ListRoute";
import classes from "./Navbar.module.scss";
import Dropdown from "./Dropdown/Dropdown";

const Nav = (props) => {
  const [man, setMan] = useState(false);

  const toggleMan = () => {
    setMan(!man);
  };

  return (
    <nav className={classes.Nav}>
      <ul className={classNames(classes.NavItems, classes.NavShop)}>
        <ListRoute
          route="/"
          content="Man"
          classes={classNames(classes.NavItem, classes.man)}
          dropdownToggle={toggleMan}
        />
        <ListRoute
          route="/"
          content="Woman"
          classes={classes.NavItem}
          dropdownToggle={toggleMan}
        />
        <ListRoute
          route="/"
          content="Accessory"
          classes={classes.NavItem}
          dropdownToggle={toggleMan}
          React
          App
        />
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
      {man && <Dropdown />}
    </nav>
  );
};

export default Nav;
