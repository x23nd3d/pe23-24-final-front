import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "./Shop.module.scss";
import Sidebar from "./Sidebar/Sidebar";
import Exposition from "./Exposition/Exposition";

const Shop = ({ shop }) => {
  const list = [
    { name: "name1", price: "pr1", id: "222" },
    { name: "name2", price: "pr2", id: "223" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
    { name: "name4", price: "pr4", id: "225" },
    { name: "name6", price: "pr6", id: "226" },
  ];

  return (
    <div className={classes.Shop}>
      <Sidebar />
      <Exposition ProductList={shop.currentItems} />
    </div>
  );
};

Shop.defaultProps = {
  shop: {},
};

Shop.propTypes = {
  shop: PropTypes.instanceOf(Object),
};

function mapStateToProps(state) {
  return {
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(Shop);
