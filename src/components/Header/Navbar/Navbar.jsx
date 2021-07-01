import React, { useState } from "react";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ListRoute from "../../UI/ListRoute/ListRoute";
import classes from "./Navbar.module.scss";
import Dropdown from "./Dropdown/Dropdown";

const Nav = (props) => {
  const [hovered, setHovered] = useState(false);

  const toggleHover = (action) => setHovered(action);

  return (
    <nav className={classes.Nav}>
      <AnimatePresence>{hovered && <Dropdown />}</AnimatePresence>
      <ul className={classNames(classes.NavItems, classes.NavShop)}>
        <ListRoute
          route="/"
          content="Man"
          listClass={classNames(classes.NavItem, classes.man)}
          mouseEnter={toggleHover}
          // mouseLeave={toggleHover}
        />
        <ListRoute
          route="/"
          content="Woman"
          listClass={classes.NavItem}
          mouseEnter={toggleHover}
          // mouseLeave={toggleHover}
        />
        <ListRoute
          route="/"
          content="Accessory"
          listClass={classes.NavItem}
          mouseEnter={toggleHover}
          // mouseLeave={toggleHover}
        />
      </ul>
      <Link className={classes.Logo} to="/">
        Originalité
      </Link>
      <ul className={classNames(classes.NavItems, classes.NavTools)}>
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
};

export default Nav;
