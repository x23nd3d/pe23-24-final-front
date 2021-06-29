import React from "react";
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
  const clothesCategories = {
    title: "Clothes",
    items: ["Costumes", "Outerwear", "Trousers"],
  };

  const { location } = history;

  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContent}>
        <ul className={classes.Routes}>
          <ListRoute listClass={classes.RoutesItem} route="/" content="Home" />
          <span>&gt;</span>
          <ListRoute
            listClass={classes.RoutesItem}
            route="/clothes"
            content="Clothes"
          />
          <span>&gt;</span>
          <ListRoute
            listClass={classes.RoutesItem}
            route="/costumes"
            content="Costumes"
          />
        </ul>
        <h2 className={classes.CategoryTitle}>{clothesCategories.title}</h2>
        <NavLink
          className={classes.CategoryAll}
          to={`${location.pathname}/&all`}
        >
          View All
        </NavLink>
        <ul className={classes.ListCategory}>
          {renderCategories(clothesCategories.items)}
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
