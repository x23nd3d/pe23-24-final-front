import React, { useState } from "react";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ListRoute from "../../UI/ListRoute/ListRoute";
import Dropdown from "./Dropdown/Dropdown";
import DropdownRoute from "../../UI/DropdownRoute/DropdownRoute";
import classes from "./Navbar.module.scss";

const Nav = (props) => {
  const [man, setMan] = useState(false);

  const toggleDropdown = () => setMan((prev) => !prev);

  const navItems = [
    { route: "/clothes", content: "Clothes" },
    { route: "/shoes", content: "Shoes" },
    { route: "/accessories", content: "Accessories" },
  ];

  const renderNavItems = (items) =>
    items.map(({ route, content }) => (
      <DropdownRoute
        key={content}
        route={route}
        content={content}
        activeClass={classes.NavItemActive}
        listClass={classes.NavItem}
        dropdownToggle={toggleDropdown}
        active={man}
      />
    ));

  return (
    <nav className={classes.Nav}>
      <AnimatePresence>{man && <Dropdown />}</AnimatePresence>
      <ul className={classNames(classes.NavItems, classes.NavShop)}>
        {renderNavItems(navItems)}
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
