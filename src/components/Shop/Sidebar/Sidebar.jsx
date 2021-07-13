import React from "react";
import { connect } from "react-redux";
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

const Sidebar = ({ sidebar, shop }) => {
  let clothesCategories;

  sidebar.categories.forEach((category) => {
    if (category.title === sidebar.chosenCategory) {
      clothesCategories = category.items;
    }
  });

  const { currentRoute } = shop;
  const allProductsRoute = (generalRoute) => {
    const allProductsRouteCurrent = generalRoute.split("=");
    allProductsRouteCurrent[2] = "all";
    return allProductsRouteCurrent.join("=");
  };

  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContent}>
        <ul className={classes.Routes}>
          <ListRoute listClass={classes.RoutesItem} route="/" content="Home" />
          <span>&gt;</span>
          <ListRoute
            listClass={classes.RoutesItem}
            route={`/shop/${allProductsRoute(currentRoute)}`}
            content={`${sidebar.chosenCategory[0].toUpperCase()}${sidebar.chosenCategory.slice(
              1
            )}`}
          />
          <span>&gt;</span>
          <ListRoute
            listClass={classes.RoutesItem}
            route={`/shop/${currentRoute}`}
            content="Costumes"
          />
        </ul>
        <h2 className={classes.CategoryTitle}>{sidebar.chosenCategory}</h2>
        <NavLink className={classes.CategoryAll} to={`/shop/${currentRoute}`}>
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
  sidebar: {},
  shop: {},
};

Sidebar.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(withRouter(Sidebar));
