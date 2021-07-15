import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Exposition from "./Exposition/Exposition";
import ShopSpinner from "../UI/Spinner/ShopSpinner/ShopSpinner";

const Shop = ({ shop, history }) => {
  if (!history.location.search.length) {
    history.push("/shop/?category=all&type=all");
  }
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
};

Shop.propTypes = {
  shop: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(withRouter(Shop));
