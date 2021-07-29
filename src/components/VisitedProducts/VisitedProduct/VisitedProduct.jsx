import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import classes from "./VisitedProducts.module.scss";

const VisitedProduct = (props) => {
  console.log("VISITED PRODUCT:", props);

  return <h2>Visited Products</h2>;
};

VisitedProduct.defaultProps = {};
VisitedProduct.propTypes = {};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VisitedProduct)
);
