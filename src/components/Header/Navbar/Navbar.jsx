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
import AccountRoutes from "../../Account/AccountRoutes/AccountRoutes";

const Nav = ({ isAuthenticated, user }) => {
  const [man, setMan] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [activeNav, setActiveNav] = useState({});

  const toggleDropdown = (e, id) => {
    if (accountMenu) {
      setAccountMenu(false);
    }
    const activeBtn = e.target.textContent.toLowerCase().trim();
    setActiveNav({ [activeBtn]: id });
    setMan((prev) => !prev);
    if (Object.values(activeNav)[0] !== id) {
      setActiveNav({ [activeBtn]: id });
      setMan(true);
    }
  };

  const toggleFastAccess = () => {
    if (man) {
      setMan(false);
    }
    setAccountMenu((prev) => !prev);
  };

  const setBackdrop = () => {
    setAccountMenu(false);
    setMan(false);
  };

  const navItems = [
    { id: 0, route: "#", content: "Clothes" },
    { id: 1, route: "#", content: "Shoes" },
    { id: 2, route: "#", content: "Accessories" },
  ];

  const accountItems = [
    { id: 0, route: "/account/", content: "Account" },
    { id: 1, route: "/logout", content: "Logout" },
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

  console.log("ACCOUNT", accountMenu);

  return (
    <>
      <nav className={classes.Nav}>
        {man || accountMenu ? <Backdrop toggle={setBackdrop} /> : null}
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
            <AccountRoutes
              active={accountMenu}
              content={user.name}
              listClass={classNames(classes.NavItem, classes.NavItemMyAccount)}
              fastAccessList={accountItems}
              fastAccessOff={setAccountMenu}
              toggleAccountItems={toggleFastAccess}
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
