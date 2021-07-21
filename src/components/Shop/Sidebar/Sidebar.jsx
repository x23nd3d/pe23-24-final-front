import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import classNames from "classnames";
import { receiveCurrentRoute } from "../../../store/actions/shop";
import {
  checkCategories,
  chooseCategory,
  chooseSubcategory,
} from "../../../store/actions/sidebar";
import classes from "./Sidebar.module.scss";

import ListRoute from "../../UI/ListRoute/ListRoute";
import ColorFilter from "./ColorFilter/ColorFilter";
import PriceFilter from "./PriceFilter/PriceFilter";

const Sidebar = ({
  sidebar,
  shop,
  categoryChooser,
  receiveRoute,
  subcategoryChooser,
  allCategoriesChooser,
}) => {
  const { chosenCategory, chosenSubcategory, categories, chosenItems } =
    sidebar;

  const subCategories = chosenCategory === "all" ? categories : chosenItems;

  const registerRoutesHandler = (route, subCategory, selectedCategory) => {
    receiveRoute(route);
    categoryChooser(selectedCategory);
    subcategoryChooser(subCategory);
    allCategoriesChooser(selectedCategory);
  };

  const renderAllSidebarItems = (arr) =>
    arr.map(({ title, items }) =>
      items.map((item) => (
        <ListRoute
          key={title + item}
          listClass={classNames(
            classes.ListItem,
            item.toLowerCase().trim() === chosenSubcategory.toLowerCase().trim()
              ? classes.ListItemActive
              : ""
          )}
          content={item}
          route={`/shop/?category=${title}&type=${item.toLowerCase()}`}
          onClick={() => {
            registerRoutesHandler(
              `shop/?category=${title}&type=${item.toLowerCase()}`,
              item,
              title
            );
          }}
        />
      ))
    );

  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContent}>
        <ul className={classes.Routes}>
          <ListRoute listClass={classes.RoutesItem} route="/" content="Home" />
          {!chosenItems.length ? null : (
            <>
              <span>&gt;</span>
              <ListRoute
                listClass={classes.RoutesItem}
                route={`/shop/?category=${chosenCategory}&type=all`}
                content={`${sidebar.chosenCategory[0].toUpperCase()}${sidebar.chosenCategory.slice(
                  1
                )}`}
                onClick={() =>
                  registerRoutesHandler(
                    `/shop/?category=${chosenCategory}&type=all`,
                    "viewAll",
                    chosenCategory
                  )
                }
              />
            </>
          )}
          {chosenSubcategory !== "viewAll" ? <span>&gt;</span> : ""}
          {chosenSubcategory !== "viewAll" ? (
            <ListRoute
              listClass={classes.RoutesItem}
              route={`/shop/?category=${chosenCategory}&type=${chosenSubcategory}`}
              content={`${chosenSubcategory[0].toUpperCase()}${chosenSubcategory.slice(
                1
              )}`}
            />
          ) : null}
        </ul>
        <h2 className={classes.CategoryTitle}>{sidebar.chosenCategory}</h2>
        {renderAllSidebarItems(subCategories)}

        {(chosenCategory && chosenSubcategory) !== "all" && (
          <NavLink
            className={classNames(
              classes.CategoryAll,
              chosenSubcategory === "viewAll" ? classes.CategoryAllActive : ""
            )}
            to={`/shop/?category=${chosenCategory}&type=all`}
            onClick={() =>
              registerRoutesHandler(
                `/shop/?category=${chosenCategory}&type=all`,
                "viewAll",
                chosenCategory
              )
            }
          >
            View All
          </NavLink>
        )}
        <ColorFilter />
        <PriceFilter />
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  sidebar: {},
  shop: {},
  receiveRoute: (f) => f,
  categoryChooser: (f) => f,
  subcategoryChooser: (f) => f,
  allCategoriesChooser: (f) => f,
};

Sidebar.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  receiveRoute: PropTypes.func,
  categoryChooser: PropTypes.func,
  subcategoryChooser: PropTypes.func,
  allCategoriesChooser: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
    categoryChooser: (route) => dispatch(chooseCategory(route)),
    subcategoryChooser: (route) => dispatch(chooseSubcategory(route)),
    allCategoriesChooser: (route) => dispatch(checkCategories(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
