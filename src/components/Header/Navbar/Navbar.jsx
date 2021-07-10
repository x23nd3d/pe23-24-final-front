import React, { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListRoute from "../../UI/ListRoute/ListRoute";
import NavigationListRoutes from "../../UI/NavigationListRoutes/NavigationListRoutes";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Navbar.module.scss";
import Search from "./Search/Search";

const Nav = ({ isAuthenticated, user }) => {
  const [man, setMan] = useState(false);
  const [account, setAccount] = useState(false);
  const [activeNav, setActiveNav] = useState({});
  const [activeAccount, setActiveAccount] = useState({});

  const toggleDropdown = (e, id) => {
    const activeBtn = e.target.textContent.toLowerCase().trim();
    setActiveNav({ [activeBtn]: id });
    setMan((prev) => !prev);
    if (Object.values(activeNav)[0] !== id) {
      setActiveNav({ [activeBtn]: id });
      setMan(true);
    }
  };

  const toggleFastAccess = (e, id) => {
    const activeBtn = e.target.textContent.toLowerCase().trim();
    setActiveNav({ [activeBtn]: id });
    setMan((prev) => !prev);
    if (Object.values(activeNav)[0] !== id) {
      setActiveNav({ [activeBtn]: id });
      setMan(true);
    }
  };

  const navItems = [
    { id: 0, route: "#", content: "Clothes" },
    { id: 1, route: "#", content: "Shoes" },
    { id: 2, route: "#", content: "Accessories" },
  ];

  const userAccountItems = [
    { id: 0, route: "#", content: "Account" },
    { id: 1, route: "#", content: "Logout" },
  ];

  const [dropdownItems] = useState({
    clothes: ["Suits", "Outerwear", "Pants"],
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

  const renderFastAccessItem = (items) =>
    items.map(({ id, route, content }) => {
      const activeCls = [
        Object.values(activeAccount)[0] === id && account
          ? classes.NavItemActive
          : null,
      ];
      const activeDropdown =
        Object.values(activeAccount)[0] === id ? man : null;
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
          {isAuthenticated ? (
            <ListRoute
              route="#"
              content={user.name}
              listClass={classNames(classes.NavItem, classes.NavItemMyAccount)}
            />
          ) : (
            <ListRoute
              route="/login"
              content="My Account"
              listClass={classNames(classes.NavItem, classes.NavItemMyAccount)}
            />
          )}
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

Nav.defaultProps = {
  isAuthenticated: null,
  user: {},
};

Nav.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    user: state.user.userId,
  };
}

export default connect(mapStateToProps)(Nav);
