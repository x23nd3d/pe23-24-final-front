import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Title from "../../../UI/Section Title/Title";
import New from "./New";
import Recommended from "./Recommended";
import Popular from "./Popular";
import { collections } from "./Collections.module.scss";
import { receiveCurrentRoute } from "../../../../store/actions/shop";
import {
  checkCategories,
  chooseCategory,
  chooseSubcategory,
} from "../../../../store/actions/sidebar";

const Collections = ({
  receiveRoute,
  mainRoute,
  categoryChooser,
  subcategoryChooser,
  checkCategoriesHandler,
}) => {
  const registerRoutesHandler = (route, subcategory) => {
    receiveRoute(route);
    checkCategoriesHandler("collections");
    categoryChooser("collections");
    subcategoryChooser(subcategory);
  };

  return (
    <section className={collections}>
      <Title text="Collections" position />
      <NavLink
        to="/shop/?category=collections&type=new"
        onClick={() =>
          registerRoutesHandler("/shop/?category=collections&type=new", "new")
        }
      >
        <New />
      </NavLink>
      <NavLink
        to="/shop/?category=collections&type=recommended"
        onClick={() =>
          registerRoutesHandler(
            "/shop/?category=collections&type=recommended",
            "recommended"
          )
        }
      >
        <Recommended />
      </NavLink>
      <NavLink
        to="/shop/?category=collections&type=popular"
        onClick={() =>
          registerRoutesHandler(
            "/shop/?category=collections&type=popular",
            "popular"
          )
        }
      >
        <Popular />
      </NavLink>
    </section>
  );
};

Collections.defaultProps = {
  mainRoute: "",
  receiveRoute: (f) => f,
  categoryChooser: (f) => f,
  subcategoryChooser: (f) => f,
  checkCategoriesHandler: (f) => f,
};

Collections.propTypes = {
  receiveRoute: PropTypes.func,
  mainRoute: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
