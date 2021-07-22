import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { expo, listItem } from "./Exposition.module.scss";
import ProductCard from "./ProductCard";

const Exposition = ({ productList }) => (
  <ul className={expo}>
    {productList.map((item) => (
      <li className={listItem} key={item.id + item.name}>
        <ProductCard item={item} />
      </li>
    ))}
  </ul>
);

Exposition.propTypes = {
  productList: PropTypes.instanceOf(Object).isRequired,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(withRouter(Exposition));
