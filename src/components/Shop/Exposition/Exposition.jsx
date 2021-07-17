import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { expo, listItem } from "./Exposition.module.scss";
import ProductCard from "./ProductCard";

const Exposition = ({ productList }) => (
  <ul className={expo}>
    {productList.map((product) => (
      <li className={listItem} key={product.id + product.name}>
        <ProductCard product={product} />
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
