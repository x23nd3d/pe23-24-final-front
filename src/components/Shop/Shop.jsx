import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Exposition from "./Exposition/Exposition";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import ShopSpinner from "../UI/Spinner/ShopSpinner/ShopSpinner";
import { filterItemsFunction } from "../../store/actions/sidebar";
import { paginationSetConfig } from "../../store/actions/shop";

const Shop = ({
  shop,
  sidebar,
  history,
  navbar,
  filterItemsHandler,
  paginationSetConfigHandler,
}) => {
  if (!history.location.search.length) {
    history.push("/shop/?category=all&type=all");
  }

  useEffect(() => {
    paginationSetConfigHandler();
  }, [paginationSetConfigHandler, shop.filteredItems]);

  useEffect(() => {
    filterItemsHandler();
  }, [
    filterItemsHandler,
    shop.currentItems,
    sidebar.chosenColors,
    sidebar.chosenPriceRange,
  ]);

  return (
    <div className={classes.Shop}>
      <Sidebar />
      {shop.loading ? (
        <ShopSpinner />
      ) : (
        <Exposition
          productList={
            shop.filteredItems.length ? shop.filteredItems : shop.currentItems
          }
        />
      )}
    </div>
  );
};

Shop.defaultProps = {
  shop: {},
  sidebar: {},
  history: {},
  navbar: {},
  filterItemsHandler: (f) => f,
  paginationSetConfigHandler: (f) => f,
};

Shop.propTypes = {
  shop: PropTypes.instanceOf(Object),
  sidebar: PropTypes.instanceOf(Object),
  navbar: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  filterItemsHandler: PropTypes.func,
  paginationSetConfigHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
    sidebar: state.sidebar,
    navbar: state.navbar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterItemsHandler: (items) => dispatch(filterItemsFunction(items)),
    paginationSetConfigHandler: () => dispatch(paginationSetConfig()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop));
