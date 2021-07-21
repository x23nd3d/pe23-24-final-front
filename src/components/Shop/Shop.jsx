import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Exposition from "./Exposition/Exposition";
import ShopSpinner from "../UI/Spinner/ShopSpinner/ShopSpinner";
import { saveFilteredItemsHandler } from "../../store/actions/shop";

const Shop = ({ shop, history, saveFilteredItemsDispatcher }) => {
  if (!history.location.search.length) {
    history.push("/shop/?category=all&type=all");
  }

  const itemsToDisplay =
    shop.filteredItems.length > 0 ? shop.filteredItems : shop.currentItems;

  return (
    <div className={classes.Shop}>
      <Sidebar />
      {shop.loading ? (
        <ShopSpinner />
      ) : (
        <Exposition productList={shop.filteredItems} />
      )}
    </div>
  );
};

Shop.defaultProps = {
  shop: {},
  history: {},
  saveFilteredItemsDispatcher: (f) => f,
};

Shop.propTypes = {
  shop: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  saveFilteredItemsDispatcher: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveFilteredItemsDispatcher: (items) =>
      dispatch(saveFilteredItemsHandler(items)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop));
