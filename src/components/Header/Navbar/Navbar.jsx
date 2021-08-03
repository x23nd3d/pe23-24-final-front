import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListRoute from "../../UI/ListRoute/ListRoute";
import NavigationListRoutes from "../../UI/NavigationListRoutes/NavigationListRoutes";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Navbar.module.scss";
import Search from "./Search/Search";
import AccountRoutes from "../../Account/AccountRoutes/AccountRoutes";
import { openCart } from "../../../store/actions/cart";
// import burgerOn from "../../../img/Navbar/circle.svg";
// import burgerOff from "../../../img/Navbar/remove.svg";
import burgerOn from "../../../img/Navbar/menu.svg";
import burgerOff from "../../../img/Navbar/close.svg";
import sidebarSwitcher from "../../../store/actions/navbar";

const Nav = ({
  isAuthenticated,
  user,
  history,
  showCart,
  cart,
  navbar,
  sidebarSwitchHandler,
}) => {
  const [man, setMan] = useState(false);
  const [accountMenu, setAccountMenu] = useState(false);
  const [activeNav, setActiveNav] = useState({});
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.innerWidth < 992 && sidebarSwitchHandler();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

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

  const closeAll = () => {
    setMan(false);
    setAccountMenu(false);
  };

  const setBackdrop = () => {
    setAccountMenu(false);
    setMan(false);
  };

  const navItems = [
    {
      id: 0,
      route: history.location.search
        ? history.location.search
        : history.location.pathname,
      content: "Clothes",
    },
    {
      id: 1,
      route: history.location.search
        ? history.location.search
        : history.location.pathname,
      content: "Shoes",
    },
    {
      id: 2,
      route: history.location.search
        ? history.location.search
        : history.location.pathname,
      content: "Accessories",
    },
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

  const showCartHandler = () => {
    setMan(false);
    setAccountMenu(false);
    showCart();
  };

  return (
    <>
      <nav data-testid="NavbarTestId" className={classes.Nav}>
        {man || accountMenu ? <Backdrop toggle={setBackdrop} /> : null}
        <ul className={classNames(classes.NavItems, classes.NavShop)}>
          {renderNavItems(navItems)}
        </ul>
        <Link className={classes.Logo} to="/">
          Originalité
        </Link>
        <ul className={classNames(classes.NavItems, classes.NavTools)}>
          <Link
            onClick={closeAll}
            className={classes.NavItem}
            to="/shop/?category=all&type=all"
          >
            Shop now
          </Link>
          {isAuthenticated ? (
            <AccountRoutes
              to={history.location.search || history.location.pathname}
              active={accountMenu}
              content={user.name}
              linkClass={classNames(classes.NavItem, classes.NavItemMyAccount)}
              fastAccessList={accountItems}
              fastAccessOff={setAccountMenu}
              toggleAccountItems={toggleFastAccess}
            />
          ) : (
            <ListRoute
              route="/login"
              content="Sign In"
              linkClass={classNames(classes.NavItem, classes.NavItemMyAccount)}
            />
          )}
          <div className={classes.CartBox}>
            {" "}
            <ListRoute
              route={history.location.search || history.location.pathname}
              content="Cart"
              onClick={showCartHandler}
              linkClass={classNames(
                classes.NavItem,
                classes.NavItemShoppingBag
              )}
            />
            {cart.items.length > 0 ? (
              <div className={classes.NavCartActive}>
                <p>{cart.items.length}</p>
              </div>
            ) : null}
          </div>

          {windowWidth < 992 && history.location.pathname.includes("shop") && (
            <li className={classes.BurgerMenu}>
              <button type="button" onClick={() => sidebarSwitchHandler()}>
                <img
                  className={classes.BurgerIcon}
                  src={navbar.burgerActive ? burgerOff : burgerOn}
                  alt="burger icon"
                />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

Nav.defaultProps = {
  isAuthenticated: null,
  showCart: (f) => f,
  sidebarSwitchHandler: (f) => f,
  user: {},
  cart: {},
  history: {},
  navbar: {},
};

Nav.propTypes = {
  isAuthenticated: PropTypes.bool,
  showCart: PropTypes.func,
  sidebarSwitchHandler: PropTypes.func,
  user: PropTypes.instanceOf(Object),
  navbar: PropTypes.instanceOf(Object),
  cart: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    user: state.user.userId,
    cart: state.cart,
    navbar: state.navbar,
    history: state.history,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showCart: () => dispatch(openCart()),
    sidebarSwitchHandler: () => dispatch(sidebarSwitcher()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
