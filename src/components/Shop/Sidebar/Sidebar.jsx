import React from "react";
import { useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ColorFilter from "./ColorFilter/ColorFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import classes from "./Sidebar.module.scss";
import ListRoute from "../../UI/ListRoute/ListRoute";

const renderCategories = (array) =>
  array.map((category) => (
    <ListRoute
      key={category}
      listClass={classes.ListItem}
      route={category.toLowerCase()}
      content={category}
    />
  ));

const Sidebar = ({ history }) => {
  const navbarReducer = useSelector((state) => state.navbarReducer);
  let clothesCategories;

  navbarReducer.categories.forEach((category) => {
    if (category.title === navbarReducer.chosenCategory) {
      clothesCategories = category.items;
    }
  });

  const { location } = history;
  console.log(location);

  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContent}>
        <ul className={classes.Routes}>
          <ListRoute listClass={classes.RoutesItem} route="/" content="Home" />
          <span>&gt;</span>
          <ListRoute
            listClass={classes.RoutesItem}
            route={`/shop/${navbarReducer.chosenCategory}`}
            content={`${navbarReducer.chosenCategory[0].toUpperCase()}${navbarReducer.chosenCategory.slice(
              1
            )}`}
          />
          <span>&gt;</span>
          {/* <ListRoute
            listClass={classes.RoutesItem}
            route="/costumes"
            content="Costumes"
          /> */}
        </ul>
        <h2 className={classes.CategoryTitle}>
          {navbarReducer.chosenCategory}
        </h2>
        <NavLink
          className={classes.CategoryAll}
          to={`${location.pathname}/&all`}
        >
          View All
        </NavLink>
        <ul className={classes.ListCategory}>
          {renderCategories(clothesCategories)}
        </ul>
        <ColorFilter />
        <PriceFilter />
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  location: {},
  history: {},
};

Sidebar.propTypes = {
  history: PropTypes.instanceOf(Object),
  location: PropTypes.instanceOf(Object),
};

export default withRouter(Sidebar);
