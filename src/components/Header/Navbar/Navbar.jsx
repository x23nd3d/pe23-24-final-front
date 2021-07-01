import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import ListRoute from "../../UI/ListRoute/ListRoute";
import classes from "./Navbar.module.scss";
import Dropdown from "./Dropdown/Dropdown";

const Nav = (props) => {
  const [hovered, setHovered] = useState(false);
  const nodeRef = useRef(null);

  const toggleHover = (action) => setHovered(action);

  useEffect(() => {
    toggleHover(false);
  }, []);

  return (
    <nav className={classes.Nav}>
      {hovered ? (
        <CSSTransition
          in={hovered}
          nodeRef={nodeRef}
          timeout={300}
          classNames={{
            enterActive: classes.dropHoverEnter,
            enterDone: classes.dropHoverEnterActive,
            exitActive: classes.dropHoverExit,
            exitDone: classes.dropHoverExitActive,
          }}
        >
          <Dropdown />
        </CSSTransition>
      ) : null}
      <ul className={classNames(classes.NavItems, classes.NavShop)}>
        <ListRoute
          route="/"
          content="Clothes"
          listClass={classNames(classes.NavItem, classes.man)}
          mouseEnter={toggleHover}
          mouseLeave={toggleHover}
        />
        <ListRoute
          route="/"
          content="Shoes"
          listClass={classes.NavItem}
          mouseEnter={toggleHover}
          mouseLeave={toggleHover}
        />
        <ListRoute
          route="/"
          content="Accessories"
          listClass={classes.NavItem}
          mouseEnter={toggleHover}
          mouseLeave={toggleHover}
        />
      </ul>
      <a className={classes.Logo} href="index.html">
        Originalité
      </a>
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
