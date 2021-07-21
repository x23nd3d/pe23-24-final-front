import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Exposition from "./Exposition/Exposition";
import ShopSpinner from "../UI/Spinner/ShopSpinner/ShopSpinner";
import { setCurrentItemsPriceRangeFunction } from "../../store/actions/sidebar";

const Shop = ({ shop, history, setCurrentItemsPriceRangeHandler }) => {
  if (!history.location.search.length) {
    history.push("/shop/?category=all&type=all");
  }

  useEffect(() => setCurrentItemsPriceRangeHandler(), [shop.currentItems]);

  return (
    <div className={classes.Shop}>
      <Sidebar />
      {shop.loading ? (
        <ShopSpinner />
      ) : (
        <Exposition productList={shop.currentItems} />
      )}
    </div>
  );
};

Shop.defaultProps = {
  shop: {},
  history: {},
  setCurrentItemsPriceRangeHandler: (f) => f,
};

Shop.propTypes = {
  shop: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  setCurrentItemsPriceRangeHandler: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentItemsPriceRangeHandler: () =>
      dispatch(setCurrentItemsPriceRangeFunction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop));
