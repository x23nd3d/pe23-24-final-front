import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { motion } from "framer-motion";
import classes from "./Dropdown.module.scss";
import ListRoute from "../../../UI/ListRoute/ListRoute";
import { receiveCurrentRoute } from "../../../../store/actions/shop";
import {
  checkCategories,
  chooseCategory,
  chooseSubcategory,
} from "../../../../store/actions/sidebar";

const Dropdown = ({
  mainRoute,
  dropdownList,
  dropdownOff,
  categoryChooser,
  receiveRoute,
  subcategoryChooser,
  checkCategoriesHandler,
}) => {
  const registerRoutesHandler = (route, subcategory) => {
    dropdownOff();
    receiveRoute(route);
    console.log("ROUTEEEEEEEEEEEEEEE", mainRoute);
    checkCategoriesHandler(mainRoute);
    categoryChooser(mainRoute);
    subcategoryChooser(subcategory);
  };

  return (
    <motion.div
      className={classNames(classes.dropdown)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={classes.container}>
        <h3 className={classes.title}>Categories</h3>
        <ul className={classes.list}>
          {dropdownList.map((route) => (
            <ListRoute
              key={route}
              content={route}
              route={`/shop/?category=${mainRoute}&type=${route.toLowerCase()}`}
              onClick={() =>
                registerRoutesHandler(
                  `shop/?category=${mainRoute}&type=${route.toLowerCase()}`,
                  route
                )
              }
              listClass={classes.listItem}
            />
          ))}
          <ListRoute
            route={`/shop/?category=${mainRoute}&type=all`}
            content="View all"
            onClick={() =>
              registerRoutesHandler(
                `/shop/?category=${mainRoute}&type=all`,
                "viewAll"
              )
            }
            listClass={classNames(classes.listItem, classes.viewAll)}
          />
        </ul>
      </div>
    </motion.div>
  );
};

Dropdown.defaultProps = {
  dropdownList: [],
  mainRoute: "",
  dropdownOff: (f) => f,
  receiveRoute: (f) => f,
  categoryChooser: (f) => f,
  subcategoryChooser: (f) => f,
  checkCategoriesHandler: (f) => f,
};

Dropdown.propTypes = {
  dropdownList: PropTypes.instanceOf(Array),
  mainRoute: PropTypes.string,
  dropdownOff: PropTypes.func,
  receiveRoute: PropTypes.func,
  categoryChooser: PropTypes.func,
  subcategoryChooser: PropTypes.func,
  checkCategoriesHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
    sidebar: state.sidebar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveRoute: (route) => dispatch(receiveCurrentRoute(route)),
    categoryChooser: (route) => dispatch(chooseCategory(route)),
    subcategoryChooser: (route) => dispatch(chooseSubcategory(route)),
    checkCategoriesHandler: (category, sub) =>
      dispatch(checkCategories(category, sub)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dropdown));
