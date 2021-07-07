import React, { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import ListRoute from "../../UI/ListRoute/ListRoute";
import NavigationListRoutes from "../../UI/NavigationListRoutes/NavigationListRoutes";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Navbar.module.scss";
import Search from "./Search/Search";

const Nav = (props) => {
  const [man, setMan] = useState(false);
  const [activeNav, setActiveNav] = useState({});

  const toggleDropdown = (e, id) => {
    const activeBtn = e.target.textContent.toLowerCase().trim();
    setActiveNav({ [activeBtn]: id });
    setMan((prev) => !prev);
    if (Object.values(activeNav)[0] !== id) {
      setActiveNav({ [activeBtn]: id });
      setMan(true);
    }
  };

  const navItems = [
    { id: 0, route: "/", content: "Clothes" },
    { id: 1, route: "/", content: "Shoes" },
    { id: 2, route: "/", content: "Accessories" },
  ];

  const [dropdownItems] = useState({
    clothes: ["Costumes", "Outerwear", "Trousers"],
    shoes: ["Boots", "Sneakers", "Shoes"],
    accessories: ["Glasses", "Belts", "Cufflinks", "Watches"],
  });

  const renderNavItems = (items) =>
    items.map(({ id, route, content }) => {
      const activeCls = [
        Object.values(activeNav)[0] === id && man
          ? classes.NavItemActive
          : null,
      ];
      const activeDropdown = Object.values(activeNav)[0] === id ? man : null;
      return (
        <NavigationListRoutes
          key={content}
          id={id}
          route={route}
          content={content}
          activeClass={activeCls.join(" ")}
          listClass={classes.NavItem}
          dropdownToggle={toggleDropdown}
          dropdownOff={setMan}
          active={activeDropdown}
          dropdownItems={dropdownItems[Object.keys(activeNav)[0]]}
        />
      );
    });

  return (
    <>
      <nav className={classes.Nav}>
        {man && <Backdrop toggle={setMan} />}
        <ul className={classNames(classes.NavItems, classes.NavShop)}>
          {renderNavItems(navItems)}
        </ul>
        <Link className={classes.Logo} to="/">
          Originalité
        </Link>
        <ul className={classNames(classes.NavItems, classes.NavTools)}>
          <ListRoute
            route="/"
            content={<Search />}
            listClass={classNames(classes.NavItem, classes.NavItemMySearch)}
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
    </>
  );
};

export default Nav;
