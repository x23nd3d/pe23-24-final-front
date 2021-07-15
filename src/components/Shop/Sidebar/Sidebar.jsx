import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import classNames from "classnames";
import { receiveCurrentRoute } from "../../../store/actions/shop";
import {
  chooseCategory,
  chooseSubcategory,
  resetSidebar,
  checkCategories,
} from "../../../store/actions/sidebar";
import classes from "./Sidebar.module.scss";

import ListRoute from "../../UI/ListRoute/ListRoute";
import ColorFilter from "./ColorFilter/ColorFilter";
import PriceFilter from "./PriceFilter/PriceFilter";

const Sidebar = ({
  sidebar,
  shop,
  categoryChooser,
  currentRoute,
  receiveRoute,
  subcategoryChooser,
  resetSidebarHandler,
  checkCategoriesHandler,
}) => {
  // console.log("ALL PROPS:", array);
  // console.log("SIDEBAR:", sidebar);

  const { chosenCategory, chosenSubcategory, categories, chosenItems } =
    sidebar;
  // console.log("CHOSEN CATEGORY:", chosenCategory);
  // console.log("CHOSEN SUBCATEGORY:", chosenSubcategory);
  // console.log("CATEGORIES:", categories);

  // const [subCategories, setSubCategories] = useState([]);

  // useEffect(() => {
  //   console.log("USEEFFECT");
  //   categories.forEach((category) => {
  //     // console.log(categories);
  //     // console.log(
  //     //   "CATEGORRRY TITLEEE NOWWWWWWWWWWWWWW!!!!!!!!!!!!!!!!!!!!!!!!!!!!1",
  //     //   category.title
  //     // );
  //     // console.log("CHOOOOOOOOOOOOOOOOOSEEEEEEEEEEENN NOWWWWW", chosenCategory);
  //     if (chosenCategory === category.title) {
  //       setSubCategories(category.items);
  //     } else {
  //       setSubCategories(categories.map((all) => all.items).flat());
  //     }
  //   });
  // }, []);

  // const subCategories = chosenItems;
  const subCategories = chosenCategory === "all" ? categories : chosenItems;

  console.log("subCategories", subCategories);

  // let subCategories;
  // console.log("KATEGOOOOOOORIIIIIIIIIAAAA:", chosenCategory);

  const getCategory = (currentCategories, subCategory) => {};

  const registerRoutesHandler = (route, subCategory) => {
    receiveRoute(route);
    subcategoryChooser(subCategory);

    // categoryChooser(category)
  };

  // console.log("SUBCATEGORIES:", subCategories);

  return (
    <div className={classes.Sidebar}>
      <div className={classes.SidebarContent}>
        <ul className={classes.Routes}>
          <ListRoute listClass={classes.RoutesItem} route="/" content="Home" />
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
                "viewAll"
              )
            }
          />
          {chosenSubcategory !== "viewAll" ? <span>&gt;</span> : ""}

          {chosenSubcategory !== "viewAll" ? (
            <ListRoute
              listClass={classes.RoutesItem}
              route={`/shop/?category=${chosenCategory}&type=${chosenSubcategory}`}
              // content={chosenSubcategory.to}
              content={`${chosenCategory[0].toUpperCase()}${chosenCategory.slice(
                1
              )}`}
            />
          ) : null}
        </ul>
        <h2 className={classes.CategoryTitle}>{sidebar.chosenCategory}</h2>

        {subCategories.items.map((subCategory) => {
          console.log(
            "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^subCategorysubCategorysubCategory",
            subCategories.title
          );
          {
            // console.log("SUBCATEGORYYY:", subCategory.toLowerCase());
            // console.log(
            // "CHOSEN SUBCATEGORYYY:",
            // chosenSubcategory !== undefined
            // ? chosenSubcategory.toLowerCase()
            // : chosenSubcategory
            // );
          }
          return (
            <ListRoute
              key={subCategory}
              listClass={classNames(
                classes.ListItem,
                subCategory === chosenSubcategory ? classes.ListItemActive : ""
              )}
              content={subCategory}
              // route="/"
              // route={`/shop/?category=${chosenCategory}&type=${subCategory.toLowerCase()}`}
              route={`/shop/?category=${[
                "clothes",
                "clothes",
                "clothes",
                "shoes",
                "shoes",
                "clothes",
                "clothes",
                "clothes",
                "clothes",
              ]}&type=${subCategory.toLowerCase()}`}
              onClick={() => {
                registerRoutesHandler(
                  `shop/?category=${chosenCategory}&type=${subCategory.toLowerCase()}`,
                  subCategory
                );
              }}
            />
          );
        })}
        {/* {console.log((chosenCategory, chosenSubcategory) === "all")} */}
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
                "viewAll"
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
  currentRoute: "",
  shop: {},
  receiveRoute: (f) => f,
  categoryChooser: (f) => f,
  subcategoryChooser: (f) => f,
  resetSidebarHandler: (f) => f,
  checkCategoriesHandler: (f) => f,
};

Sidebar.propTypes = {
  sidebar: PropTypes.instanceOf(Object),
  shop: PropTypes.instanceOf(Object),
  receiveRoute: PropTypes.func,
  categoryChooser: PropTypes.func,
  subcategoryChooser: PropTypes.func,
  resetSidebarHandler: PropTypes.func,
  checkCategoriesHandler: PropTypes.func,
  currentRoute: PropTypes.string,
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
    resetSidebarHandler: () => dispatch(resetSidebar()),
    checkCategoriesHandler: (category) => dispatch(checkCategories(category)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
