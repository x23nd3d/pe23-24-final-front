import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Exposition from "./Exposition/Exposition";
import ShopSpinner from "../UI/Spinner/ShopSpinner/ShopSpinner";
import { filterItemsFunction } from "../../store/actions/sidebar";

const Shop = ({ shop, sidebar, history, filterItemsHandler }) => {
  if (!history.location.search.length) {
    history.push("/shop/?category=all&type=all");
  }

  useEffect(() => {
    console.log("UPDATEEEEEEEEEEEEEEE");
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
  filterItemsHandler: (f) => f,
};

Shop.propTypes = {
  shop: PropTypes.instanceOf(Object),
  sidebar: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  filterItemsHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
    sidebar: state.sidebar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterItemsHandler: (items) => dispatch(filterItemsFunction(items)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop));
