import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { receiveCurrentRoute } from "../../store/actions/shop";
import {
  checkCategories,
  chooseCategory,
  chooseSubcategory,
} from "../../store/actions/sidebar";
import CollectionsRoutesContext from "./CollectionsRoutesContext";

const CollectionsRoutes = ({
  children,
  receiveRoute,
  categoryChooser,
  subcategoryChooser,
  checkCategoriesHandler,
}) => {
  const registerRoutesHandler = (route, subcategory, mainRoute) => {
    receiveRoute(route);
    checkCategoriesHandler(mainRoute);
    categoryChooser(mainRoute);
    subcategoryChooser(subcategory);
  };

  return (
    <CollectionsRoutesContext.Provider
      value={{
        registerRoutesHandler,
      }}
    >
      {children}
    </CollectionsRoutesContext.Provider>
  );
};

CollectionsRoutes.defaultProps = {
  children: {},
  receiveRoute: (f) => f,
  categoryChooser: (f) => f,
  subcategoryChooser: (f) => f,
  checkCategoriesHandler: (f) => f,
};

CollectionsRoutes.propTypes = {
  children: PropTypes.instanceOf(Object),
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsRoutes);
