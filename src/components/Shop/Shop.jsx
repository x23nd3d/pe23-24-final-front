import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Exposition from "./Exposition/Exposition";
import ShopSpinner from "../UI/Spinner/ShopSpinner/ShopSpinner";
import { setFilteredItems } from "../../store/actions/shop";

const Shop = ({ shop, sidebar, history, filteredItemsHandler }) => {
  if (!history.location.search.length) {
    history.push("/shop/?category=all&type=all");
  }

  // const filteredItems = shop.currentItems
  //   .filter((item) => {
  //     if (
  //       +item.price >= sidebar.chosenPriceRange.min &&
  //       +item.price <= sidebar.chosenPriceRange.max
  //     )
  //       return item;
  //   })
  //   .filter((item) => {
  //     if (item.color.includes(sidebar.chosenColor)) return item;
  //   });

  // if ((sidebar.))

  const allItems = shop.currentItems;
  const filteredItems = allItems.filter((item) => {
    if (
      +item.price >= sidebar.chosenPriceRange.min &&
      +item.price <= sidebar.chosenPriceRange.max
      //   ||
      // (sidebar.chosenPriceRange.min && sidebar.chosenPriceRange.max) === ""
    ) {
      return item;
    }
  });
  // .filter((item) => {
  //   if (sidebar.chosenColor.length === 0) return item;
  //   // return item.color.includes(...sidebar.chosenColor);
  //   // return item.color.filter((a) => sidebar.chosenColor.includes(a));

  //   // return sidebar.chosenColor.includes(item.color);
  // });

  // useEffect(() => filteredItemsHandler(filteredItems), []);

  return (
    <div className={classes.Shop}>
      <Sidebar />
      {shop.loading ? (
        <ShopSpinner />
      ) : (
        // <Exposition productList={filteredItems} />
        <Exposition productList={filteredItems} />
        // <Exposition
        //   productList={
        //     shop.filteredItems.length !== 0
        //       ? shop.filteredItems
        //       : shop.currentItems
        //   }
        // />
      )}
    </div>
  );
};

Shop.defaultProps = {
  shop: {},
  sidebar: {},
  history: {},
  filteredItemsHandler: (f) => f,
};

Shop.propTypes = {
  shop: PropTypes.instanceOf(Object),
  sidebar: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  filteredItemsHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filteredItemsHandler: (route) => dispatch(setFilteredItems(route)),
  };
}

// setFilteredItems

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop));
