import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { expo, listItem } from "./Exposition.module.scss";
import ProductCard from "./ProductCard";

const Exposition = ({ productList }) => (
  <ul className={expo}>
    {productList.map((product) => (
      <li className={listItem} key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);

Exposition.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
    shop: state.shop,
  };
}

export default connect(mapStateToProps)(withRouter(Exposition));
