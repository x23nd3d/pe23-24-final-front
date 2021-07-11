import React from "react";
import { useSelector, connect } from "react-redux";
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

const Sidebar = ({ history, sidebar }) => {
  let clothesCategories;
  console.log("SIDEBAR", sidebar);

  sidebar.categories.forEach((category) => {
    if (category.title === sidebar.chosenCategory) {
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
            route={`/shop/${sidebar.chosenCategory}`}
            content={`${sidebar.chosenCategory[0].toUpperCase()}${sidebar.chosenCategory.slice(
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
        <h2 className={classes.CategoryTitle}>{sidebar.chosenCategory}</h2>
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
  sidebar: {},
};

Sidebar.propTypes = {
  history: PropTypes.instanceOf(Object),
  location: PropTypes.instanceOf(Object),
  sidebar: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
  };
}

export default connect(mapStateToProps)(withRouter(Sidebar));
